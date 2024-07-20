import{r as u,z as b,o as W,f as p,l as z,q as e,s as i,C as V,G as k,u as D,k as A,m,P as x}from"./entry.d2eac3d2.js";const B={class:"menu_drawer_dashboard"},C={class:"lang_switch d-flex align-center pt-2",style:{gap:"15px"}},N=m("p",{style:{"font-size":"18px","font-weight":"900"}},"احمد المصري",-1),S={__name:"AppSideDrawer",props:["currentWidth"],setup(f){const l=f,n=u(!1),s=u(null),{$listen:_}=D();return b(()=>l.currentWidth,d=>{d<1200?n.value=!1:n.value=!0}),W(()=>{_("openDashboardDrawer",()=>{n.value=!n.value}),window.onresize=()=>{s.value=window.innerWidth},s.value=window.innerWidth,l.currentWidth<1200?n.value=!1:n.value=!0}),(d,o)=>{const y=p("v-icon"),v=p("v-avatar"),g=p("v-card-title"),c=p("v-divider"),t=p("v-list-item"),r=p("v-list-group"),w=p("v-list"),h=p("v-card"),j=p("v-navigation-drawer");return A(),z("div",B,[e(j,{modelValue:V(n),"onUpdate:modelValue":o[0]||(o[0]=a=>k(n)?n.value=a:null),elevation:"1",touchless:!0,width:320,class:"pt-0 cart-drawer",location:"right",theme:"dark"},{default:i(()=>[e(h,{class:"px-0",elevation:"0"},{default:i(()=>[e(g,{class:"d-flex justify-space-between w-100 pl-4 pl-2",dir:"rtl",style:{"font-size":"20px","font-weight":"bold"}},{default:i(()=>[m("div",C,[e(v,{size:"36px",style:{border:"2px solid rgb(109, 109, 109)"}},{default:i(()=>[e(y,{color:"blue",icon:"mdi-account"})]),_:1}),N])]),_:1}),e(c,{class:"mt-2"}),e(c),e(w,{density:"compact",nav:"",class:"pa-0 mt-5"},{default:i(()=>[e(t,{style:{gap:"0px !important",padding:"10px 12px",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-receipt-text",title:"فواتير التوريد",value:"export_invoices",to:{name:"export_invoices"}}),e(t,{style:{gap:"0px !important",padding:"10px 12px",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-currency-usd",title:"سدادات الموردين",value:"suppliers_payments",to:{name:"suppliers_payments"}}),e(t,{style:{gap:"0px !important",padding:"10px 12px",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-currency-usd",class:"text-white",title:"مستحقات الشركة",value:"clients_dues",to:{name:"clients_dues"}}),e(r,{value:"التقارير"},{activator:i(({props:a})=>[e(t,x({style:{gap:"0px !important",padding:"10px 14px",display:"flex","justify-content":"flex-end"}},a,{"append-icon":"mdi-file-chart","prepend-icon":"mdi-chevron-down",title:"التقارير"}),null,16)]),default:i(()=>[e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",class:"text-white",title:"تقرير التوريدات",value:"reports-invoices",to:{name:"reports-invoices"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",class:"text-white",title:"تقرير مستحقات الموردين",value:"reports-suppliers_dues",to:{name:"reports-supplier_dues"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",class:"text-white",title:"تقرير سدادات الموردين",value:"reports-suppliers_payments",to:{name:"reports-suppliers_payments"}})]),_:1}),e(r,{value:"مدخلات البرنامج"},{activator:i(({props:a})=>[e(t,x({style:{gap:"0px !important",padding:"10px 14px",display:"flex","justify-content":"flex-end"}},a,{"append-icon":"mdi-cog-transfer","prepend-icon":"mdi-chevron-down",title:"مدخلات البرنامج"}),null,16)]),default:i(()=>[e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"انواع المنتج",value:"suppliers",to:{name:"product_types"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"المنتجات",value:"products",to:{name:"products"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"الصوامع",value:"granary",to:{name:"granary"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"العملاء",value:"clients",to:{name:"clients"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"الموردين",value:"product_types",to:{name:"suppliers"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"وحدات الوزن",value:"measuring_units",to:{name:"measuring_units"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"وحدات التعبئة",value:"product_units",to:{name:"product_units"}}),e(t,{style:{gap:"0px !important",padding:"10px 40px 10px 0",display:"flex","justify-content":"flex-end"},"append-icon":"mdi-circle-medium",title:"انواع الضرايب",value:"taxes",to:{name:"taxes"}})]),_:1})]),_:1})]),_:1})]),_:1},8,["modelValue"])])}}};export{S as default};