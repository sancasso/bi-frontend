"use strict";(self.webpackChunkant_design_pro=self.webpackChunkant_design_pro||[]).push([[901],{14145:function(O,o,e){e.r(o);var c=e(97857),i=e.n(c),E=e(15009),m=e.n(E),p=e(99289),b=e.n(p),D=e(86536),v=e(96906),f=e(21586),j=e(90156),T=e(67294),n=e(85893),M=[{dataIndex:"id",valueType:"indexBorder",width:48},{title:"\u7528\u6237\u540D",dataIndex:"userName",copyable:!0},{title:"\u7528\u6237\u8D26\u6237",dataIndex:"userAccount",copyable:!0},{title:"\u5934\u50CF",dataIndex:"userAvatar",render:function(l,t){return(0,n.jsx)("div",{children:(0,n.jsx)(j.Z,{src:t.userAvatar,width:100})})}},{title:"\u89D2\u8272",dataIndex:"userRole",valueType:"select",valueEnum:{user:{text:"\u666E\u901A\u7528\u6237",status:"Default"},admin:{text:"\u7BA1\u7406\u5458",status:"Success"}}},{title:"\u521B\u5EFA\u65F6\u95F4",dataIndex:"createTime",valueType:"dateTime"},{title:"\u64CD\u4F5C",valueType:"option",render:function(l,t,s,r){return[(0,n.jsx)("a",{onClick:function(){var _;r==null||(_=r.startEditable)===null||_===void 0||_.call(r,t.id)},children:"\u7F16\u8F91"},"editable"),(0,n.jsx)("a",{href:t.url,target:"_blank",rel:"noopener noreferrer",children:"\u67E5\u770B"},"view"),(0,n.jsx)(v.Z,{onSelect:function(){return r==null?void 0:r.reload()},menus:[{key:"copy",name:"\u590D\u5236"},{key:"delete",name:"\u5220\u9664"}]},"actionGroup")]}}];o.default=function(){var d=(0,T.useRef)();return(0,n.jsx)(f.Z,{columns:M,actionRef:d,cardBordered:!0,request:b()(m()().mark(function l(){var t,s,r,u,_=arguments;return m()().wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return t=_.length>0&&_[0]!==void 0?_[0]:{},s=_.length>1?_[1]:void 0,r=_.length>2?_[2]:void 0,console.log(s,r),a.next=6,(0,D.po)();case 6:return u=a.sent,a.abrupt("return",{data:u.data});case 8:case"end":return a.stop()}},l)})),editable:{type:"multiple"},columnsState:{persistenceKey:"pro-table-singe-demos",persistenceType:"localStorage"},rowKey:"id",search:{labelWidth:"auto"},form:{syncToUrl:function(t,s){return s==="get"?i()(i()({},t),{},{created_at:[t.startTime,t.endTime]}):t}},pagination:{pageSize:5},dateFormatter:"string",headerTitle:"\u7528\u6237\u4FE1\u606F"})}}}]);