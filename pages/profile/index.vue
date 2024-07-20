<template>
  <div class="profile pt-5">
    <form action="" class="w-100 mx-auto pt-7" @submit.prevent="submitForm">
      <v-container class="pb-10 px-10" fluid>
        <v-row class="bg-white pb-10 px-5">
          <v-col cols="12">
            <div class="d-flex justify-space-between align-center py-5">
              <h2 class="main_title">Profile</h2>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="field_container">
              <div class="input_parent position-relative">
                <v-text-field
                  label="First Name"
                  rounded="lg"
                  v-model="data.firstName"
                  variant="outlined"
                  :error="$v.firstName.$error"
                  :errorMessages="$v.firstName.$errors[0]?.$message"
                  :disabled="!enableEdit"
                  prependInnerIcon="mdi-rename-outline"
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="6">
            <div class="field_container">
              <div class="input_parent position-relative">
                <v-text-field
                  label="Last Name"
                  rounded="lg"
                  v-model="data.lastName"
                  variant="outlined"
                  :error="$v.lastName.$error"
                  :errorMessages="$v.lastName.$errors[0]?.$message"
                  :disabled="!enableEdit"
                  prependInnerIcon="mdi-rename-outline"
                ></v-text-field>
              </div>
            </div>
          </v-col>

          <v-col cols="6">
            <div class="field_container">
              <div class="input_parent position-relative">
                <v-text-field
                  label="Code"
                  rounded="lg"
                  v-model="data.email"
                  variant="outlined"
                  :disabled="true"
                  prependInnerIcon="mdi-at"
                ></v-text-field>
              </div>
            </div>
          </v-col>

          <v-col cols="12" md="6">
            <div class="field_container">
              <div class="input_parent position-relative">
                <v-text-field
                  label="Password"
                  rounded="lg"
                  v-model="data.password"
                  variant="outlined"
                  :type="showPassword ? 'text' : 'password'"
                  :error="$v.password.$error"
                  :errorMessages="$v.password.$errors[0]?.$message"
                  prependInnerIcon="mdi-lock-outline"
                  :disabled="!enableEdit"
                  :appendInnerIcon="`mdi-${
                    showPassword ? 'eye-off' : 'eye'
                  }-outline`"
                  @click:append-inner="showPassword = !showPassword"
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="field_container">
              <div class="input_parent position-relative">
                <v-text-field
                  label="Confirm Password"
                  rounded="lg"
                  v-model="data.confirmPassword"
                  variant="outlined"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  :error="$v.confirmPassword.$error"
                  :errorMessages="$v.confirmPassword.$errors[0]?.$message"
                  prependInnerIcon="mdi-lock-outline"
                  :disabled="!enableEdit"
                  :appendInnerIcon="`mdi-${
                    showConfirmPassword ? 'eye-off' : 'eye'
                  }-outline`"
                  @click:append-inner="
                    showConfirmPassword = !showConfirmPassword
                  "
                ></v-text-field>
              </div>
            </div>
          </v-col>
          <v-col cols="12" class="mt-5 text-center">
            <v-btn
              width="160"
              rounded="lg"
              color="blue"
              elevation="0"
              v-if="!enableEdit"
              @click="enableEdit = true"
              >Edit</v-btn
            >
            <v-btn
              width="160"
              rounded="lg"
              color="red"
              elevation="0"
              v-if="enableEdit"
              class="me-4"
              @click="enableEdit = false"
              >Cancel</v-btn
            >
            <v-btn
              width="160"
              rounded="lg"
              color="green"
              elevation="0"
              v-if="enableEdit"
              type="submit"
              :loading="loading"
              >Save</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </form>
  </div>
</template>

<script setup>
import { authStore } from "@/stores/auth/auth";
import { userStore } from "@/stores/users";
import { storeToRefs } from "pinia";

// Validator
import useVuelidator from "@vuelidate/core";
import { required, helpers, minLength, sameAs } from "@vuelidate/validators";

const enableEdit = ref(false);
const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const data = ref({
  firstName: "",
  lastName: "",
  password: "",
  email: "",
  confirmPassword: "",
});

const roles = computed(() => {
  return {
    firstName: {
      required: helpers.withMessage("Enter your first name", required),
    },
    lastName: {
      required: helpers.withMessage("Enter your last name", required),
    },
    password: {
      minLength: helpers.withMessage(
        "Password should be 6 chars length or more",
        minLength(6)
      ),
    },
    confirmPassword: {
      sameAs: helpers.withMessage(
        "Passwords are not identical",
        sameAs(data.value.password)
      ),
    },
  };
});

const { loggerData } = storeToRefs(authStore());

let $v = useVuelidator(roles, data);

const submitForm = async () => {
  const res = await $v.value.$validate();
  if (res) {
    loading.value = true;
    const obj = {
      ...data.value,
      userName: `${data.value.firstName} ${data.value.lastName}`,
      _id: loggerData.value._id,
    };

    if (!obj.password) {
      delete obj.password;
      delete obj.confirmPassword;
    }

    delete obj.firstName;
    delete obj.lastName;

    await userStore().doUpdateUser(obj, obj._id);
    
    loading.value = false;

    useCookie("logger", {
      maxAge: 1,
    }).value = null;
    setTimeout(() => {
      useRouter().push({ name: "signin" });
    }, 1000);
  }
};

onMounted(() => {
  data.value.firstName = loggerData.value.userName.split(" ")[0];
  data.value.lastName = loggerData.value.userName.split(" ")[1];
  data.value.email = loggerData.value.email;
});
</script>
