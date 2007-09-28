Ext.namespace("Egw.Addressbook");Egw.Addressbook=function(){var t;var l;var G;var m;var X,R,W;var b;var A=function(C){if(X){var c=X.pressed;}else{var c=true;}if(R){var L=R.pressed;}else{var L=true;}switch(b.attributes.datatype){case "list":C.baseParams.listId=b.attributes.listId;C.baseParams.method="Addressbook.getList";break;case "contacts":case "otherpeople":case "sharedaddressbooks":C.baseParams.method="Addressbook.getContacts";C.baseParams.options=Ext.encode({displayContacts:c,displayLists:L});break;case "overview":C.baseParams.method="Addressbook.getOverview";C.baseParams.options=Ext.encode({displayContacts:c,displayLists:L});break;}if(W){C.baseParams.query=W.getValue();}};var s=function(O,j){b=j;var c=O.getRegion("center",false);c.remove(0);var C=Ext.Element.get("content");var n=C.createChild({tag:"div",id:"toolbargriddiv"});var f=C.createChild({tag:"div",id:"outergriddiv"});t=new Ext.data.JsonStore({url:"index.php",baseParams:{datatype:b.attributes.datatype,owner:b.attributes.owner,query:""},root:"results",totalProperty:"totalcount",id:"contact_id",fields:[{name:"contact_id"},{name:"contact_tid"},{name:"contact_owner"},{name:"contact_private"},{name:"cat_id"},{name:"n_family"},{name:"n_given"},{name:"n_middle"},{name:"n_prefix"},{name:"n_suffix"},{name:"n_fn"},{name:"n_fileas"},{name:"contact_bday"},{name:"org_name"},{name:"org_unit"},{name:"contact_title"},{name:"contact_role"},{name:"contact_assistent"},{name:"contact_room"},{name:"adr_one_street"},{name:"adr_one_street2"},{name:"adr_one_locality"},{name:"adr_one_region"},{name:"adr_one_postalcode"},{name:"adr_one_countryname"},{name:"contact_label"},{name:"adr_two_street"},{name:"adr_two_street2"},{name:"adr_two_locality"},{name:"adr_two_region"},{name:"adr_two_postalcode"},{name:"adr_two_countryname"},{name:"tel_work"},{name:"tel_cell"},{name:"tel_fax"},{name:"tel_assistent"},{name:"tel_car"},{name:"tel_pager"},{name:"tel_home"},{name:"tel_fax_home"},{name:"tel_cell_private"},{name:"tel_other"},{name:"tel_prefer"},{name:"contact_email"},{name:"contact_email_home"},{name:"contact_url"},{name:"contact_url_home"},{name:"contact_freebusy_uri"},{name:"contact_calendar_uri"},{name:"contact_note"},{name:"contact_tz"},{name:"contact_geo"},{name:"contact_pubkey"},{name:"contact_created"},{name:"contact_creator"},{name:"contact_modified"},{name:"contact_modifier"},{name:"contact_jpegphoto"},{name:"account_id"}],remoteSort:true});A(t);t.setDefaultSort("n_family","asc");t.load({params:{start:0,limit:50}});t.on("beforeload",A);var N=new Ext.grid.ColumnModel([{resizable:true,id:"contact_tid",header:"Type",dataIndex:"contact_tid",width:30,renderer:Y},{resizable:true,id:"n_family",header:"Family name",dataIndex:"n_family"},{resizable:true,id:"n_given",header:"Given name",dataIndex:"n_given"},{resizable:true,id:"n_fn",header:"Full name",dataIndex:"n_fn",hidden:true},{resizable:true,id:"n_fileas",header:"Name + Firm",dataIndex:"n_fileas",hidden:true},{resizable:true,id:"contact_email",header:"eMail",dataIndex:"contact_email",width:150,hidden:false},{resizable:true,id:"contact_bday",header:"Birthday",dataIndex:"contact_bday",hidden:true},{resizable:true,id:"org_name",header:"Organisation",dataIndex:"org_name",width:150},{resizable:true,id:"org_unit",header:"Unit",dataIndex:"org_unit",hidden:true},{resizable:true,id:"contact_title",header:"Title",dataIndex:"contact_title",hidden:true},{resizable:true,id:"contact_role",header:"Role",dataIndex:"contact_role",hidden:true},{resizable:true,id:"contact_room",header:"Room",dataIndex:"contact_room",hidden:true},{resizable:true,id:"adr_one_street",header:"Street",dataIndex:"adr_one_street",hidden:true},{resizable:true,id:"adr_one_locality",header:"Locality",dataIndex:"adr_one_locality",hidden:false},{resizable:true,id:"adr_one_region",header:"Region",dataIndex:"adr_one_region",hidden:true},{resizable:true,id:"adr_one_postalcode",header:"Postalcode",dataIndex:"adr_one_postalcode",hidden:true},{resizable:true,id:"adr_one_countryname",header:"Country",dataIndex:"adr_one_countryname",hidden:true},{resizable:true,id:"adr_two_street",header:"Street (private)",dataIndex:"adr_two_street",hidden:true},{resizable:true,id:"adr_two_locality",header:"Locality (private)",dataIndex:"adr_two_locality",hidden:true},{resizable:true,id:"adr_two_region",header:"Region (private)",dataIndex:"adr_two_region",hidden:true},{resizable:true,id:"adr_two_postalcode",header:"Postalcode (private)",dataIndex:"adr_two_postalcode",hidden:true},{resizable:true,id:"adr_two_countryname",header:"Country (private)",dataIndex:"adr_two_countryname",hidden:true},{resizable:true,id:"tel_work",header:"Phone",dataIndex:"tel_work",hidden:false},{resizable:true,id:"tel_cell",header:"Cellphone",dataIndex:"tel_cell",hidden:false},{resizable:true,id:"tel_fax",header:"Fax",dataIndex:"tel_fax",hidden:true},{resizable:true,id:"tel_car",header:"Car phone",dataIndex:"tel_car",hidden:true},{resizable:true,id:"tel_pager",header:"Pager",dataIndex:"tel_pager",hidden:true},{resizable:true,id:"tel_home",header:"Phone (private)",dataIndex:"tel_home",hidden:true},{resizable:true,id:"tel_fax_home",header:"Fax (private)",dataIndex:"tel_fax_home",hidden:true},{resizable:true,id:"tel_cell_private",header:"Cellphone (private)",dataIndex:"tel_cell_private",hidden:true},{resizable:true,id:"contact_email_home",header:"eMail (private)",dataIndex:"contact_email_home",hidden:true},{resizable:true,id:"contact_url",header:"URL",dataIndex:"contact_url",hidden:true},{resizable:true,id:"contact_url_home",header:"URL (private)",dataIndex:"contact_url_home",hidden:true},{resizable:true,id:"contact_note",header:"Note",dataIndex:"contact_note",hidden:true},{resizable:true,id:"contact_tz",header:"Timezone",dataIndex:"contact_tz",hidden:true},{resizable:true,id:"contact_geo",header:"Geo",dataIndex:"contact_geo",hidden:true},]);N.defaultSortable=true;l=new Ext.grid.Grid(f,{ds:t,cm:N,autoSizeColumns:false,selModel:new Ext.grid.RowSelectionModel({multiSelect:true}),enableColLock:false,loadMask:true,enableDragDrop:true,ddGroup:"TreeDD",autoExpandColumn:"n_given"});l.render();l.on("rowclick",function(Z,a,z){var P=l.getSelectionModel().getCount();var Q=J.items.map;if(P<1){Q.editbtn.disable();Q.deletebtn.disable();}else{if(P==1){Q.editbtn.enable();Q.deletebtn.enable();}else{Q.editbtn.disable();Q.deletebtn.enable();}}});l.on("rowdblclick",function(Q,a,z){var P=Q.getDataSource().getAt(a);if(P.data.contact_tid=="l"){try{E(P.data.contact_id,"list");}catch(Z){}}else{try{E(P.data.contact_id);}catch(Z){}}});l.on("rowcontextmenu",function(z,a,Q){Q.stopEvent();var P=z.getDataSource().getAt(a);if(P.data.contact_tid=="l"){p.showAt(Q.getXY());}else{i.showAt(Q.getXY());}});var o=l.getView().getHeaderPanel(true);var J=new Ext.Toolbar(n);var L=Ext.DomHelper.append(J.el,{tag:"div",id:Ext.id()},true);var T=new Ext.PagingToolbar(L,t,{pageSize:50,cls:"x-btn-icon-22",displayInfo:true,displayMsg:"Displaying contacts {0} - {1} of {2}",emptyMsg:"No contacts to display"});J.addButton({id:"addbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/add-user.png",tooltip:"add new contact",handler:D});J.addButton({id:"addlstbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/add-users.png",tooltip:"add new list",handler:B});J.addButton({id:"editbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/edit.png",tooltip:"edit current item",disabled:true,handler:S});J.addButton({id:"deletebtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/edit-delete.png",tooltip:"delete selected items",disabled:true,handler:h});J.insertButton(4,new Ext.Toolbar.Separator());X=J.addButton({id:"filtercontactsbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/user.png",tooltip:"display contacts",enableToggle:true,pressed:true,handler:K});R=J.addButton({id:"filterlistsbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/users.png",tooltip:"display lists",enableToggle:true,pressed:true,handler:v});J.addButton({id:"exportbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/file-export.png",tooltip:"export selected contacts",disabled:false,onClick:d});W=new Ext.form.TextField({height:22,width:200,emptyText:"Suchparameter ...",allowBlank:false});W.on("specialkey",function(Q,P){if(P.getKey()==P.ENTER||P.getKey()==e.RETURN){t.reload();}});J.add(new Ext.Toolbar.Fill());J.addField(W);J.add({id:"clearsearchbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/clear-left.png",tooltip:"L�sche bestehende Sucheingabe",disabled:false,onClick:function(){W.setValue("");t.reload();}});J.add({id:"searchbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/mail-find.png",tooltip:"Suche Adresse/Adressliste",disabled:false,onClick:function(){t.reload();}});c.add(new Ext.GridPanel(l,{toolbar:J}));};var Y=function(J,o,L,c,C,n){switch(J){case "l":return "<img src='images/oxygen/16x16/actions/users.png' width='12' height='12' alt='list'/>";default:return "<img src='images/oxygen/16x16/actions/user.png' width='12' height='12' alt='contact'/>";}};var K=function(C,c){t.reload();};var v=function(C,c){t.reload();};var h=function(n,c){var L=Array();var J=l.getSelectionModel().getSelections();for(var C=0;C<J.length;++C){L.push(J[C].id);}u(L,function(){t.reload();});t.reload();};var S=function(J,c){var L=l.getSelectionModel().getSelections();var C=L[0].id;if(L[0].data.contact_tid=="l"){E(C,"list");}else{E(C);}};var D=function(C,c){E();};var B=function(C,c){E("","list");};var r=function(n,c){var L=Array();var J=l.getSelectionModel().getSelections();for(var C=0;C<J.length;++C){L.push(J[C].id);}u(L,function(){Egw.Addressbook.reload();});t.reload();};var I=function(J,c){var L=l.getSelectionModel().getSelections();var C=L[0].id;E(C,"list");};var i=new Ext.menu.Menu({id:"ctxMenuAddress",items:[{id:"edit",text:"edit contact",icon:"images/oxygen/16x16/actions/edit.png",handler:S},{id:"delete",text:"delete contact",icon:"images/oxygen/16x16/actions/edit-delete.png",handler:h},"-",{id:"new contact",text:"new contact",icon:"images/oxygen/16x16/actions/add-user.png",handler:D},{id:"new list",text:"new list",icon:"images/oxygen/16x16/actions/add-users.png",handler:B}]});var p=new Ext.menu.Menu({id:"ctxMenuList",items:[{id:"edit",text:"edit list",icon:"images/oxygen/16x16/actions/edit.png",handler:I},{id:"delete",text:"delete list",icon:"images/oxygen/16x16/actions/edit-delete.png",handler:r},"-",{id:"new contact",text:"new contact",icon:"images/oxygen/16x16/actions/add-user.png",handler:D},{id:"new list",text:"new list",icon:"images/oxygen/16x16/actions/add-users.png",handler:B}]});var d=function(C,c){};var E=function(N,L){var C;var O=1024,f=786;var J=950,T=600;if(L=="list"){J=450,T=600;}if(document.all){O=document.body.clientWidth;f=document.body.clientHeight;x=window.screenTop;y=window.screenLeft;}else{if(window.innerWidth){O=window.innerWidth;f=window.innerHeight;x=window.screenX;y=window.screenY;}}var n=((O-J)/2)+y,o=((f-T)/2)+x;if(L=="list"&&!N){C="index.php?method=Addressbook.editList";}else{if(L=="list"&&N){C="index.php?method=Addressbook.editList&contactid="+N;}else{if(L!="list"&&N){C="index.php?method=Addressbook.editContact&contactid="+N;}else{C="index.php?method=Addressbook.editContact";}}}appId="addressbook";var c=window.open(C,"popupname","width="+J+",height="+T+",top="+o+",left="+n+",directories=no,toolbar=no,location=no,menubar=no,scrollbars=no,status=no,resizable=no,dependent=no");return ;};var k=function(c){c=(c==null)?false:c;window.opener.Egw.Addressbook.reload();if(c==true){window.setTimeout("window.close()",400);}};var u=function(C,c,L){var J=Ext.util.JSON.encode(C);new Ext.data.Connection().request({url:"index.php",method:"post",scope:this,params:{method:"Addressbook.deleteContacts",_contactIDs:J},success:function(o,f){var n;try{n=Ext.util.JSON.decode(o.responseText);if(n.success==true){if(typeof c=="function"){c;}}else{Ext.MessageBox.alert("Failure!","Deleting contact failed!");}}catch(N){Ext.MessageBox.alert("Failure!",N.message);}},failure:function(n,o){console.log("failure function called");}});};var q=function(C,c){Ext.MessageBox.alert("Export","Not yet implemented.");};var U=function(){Ext.QuickTips.init();Ext.form.Field.prototype.msgTarget="side";var n=new Ext.BorderLayout(document.body,{north:{split:false,initialSize:28},center:{autoScroll:true}});n.beginUpdate();n.add("north",new Ext.ContentPanel("header",{fitToFrame:true}));n.add("center",new Ext.ContentPanel("content"));n.endUpdate();var O=true;if(formData.values){O=false;}var C=new Ext.Toolbar("header");C.add({id:"savebtn",cls:"x-btn-text-icon",text:"Save and Close",icon:"images/oxygen/22x22/actions/document-save.png",tooltip:"save this contact and close window",onClick:function(){if(L.isValid()){var j={};if(formData.values){j.contact_id=formData.values.contact_id;}L.submit({waitTitle:"Please wait!",waitMsg:"saving contact...",params:j,success:function(P,Q,z){window.opener.Egw.Addressbook.reload();window.setTimeout("window.close()",400);},failure:function(P,Q){}});}else{Ext.MessageBox.alert("Errors","Please fix the errors noted.");}}},{id:"savebtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/save-all.png",tooltip:"apply changes for this contact",onClick:function(){if(L.isValid()){var j={};if(formData.values){j.contact_id=formData.values.contact_id;}L.submit({waitTitle:"Please wait!",waitMsg:"saving contact...",params:j,success:function(P,Q,z){window.opener.Egw.Addressbook.reload();},failure:function(P,Q){}});}else{Ext.MessageBox.alert("Errors","Please fix the errors noted.");}}},{id:"deletebtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/edit-delete.png",tooltip:"delete this contact",disabled:O,handler:function(P,j){if(formData.values.contact_id){Ext.MessageBox.wait("Deleting contact...","Please wait!");u([formData.values.contact_id]);k(true);}}},{id:"exportbtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/file-export.png",tooltip:"export this contact",disabled:O,handler:q});var N=new Ext.data.JsonStore({url:"index.php",baseParams:{method:"Egwbase.getCountryList"},root:"results",id:"shortName",fields:["shortName","translatedName"],remoteSort:false});var o=new Ext.data.SimpleStore({fields:["id","addressbooks"],data:formData.config.addressbooks});var c=Ext.Element.get("content");var L=new Ext.form.Form({labelWidth:75,url:"index.php?method=Addressbook.saveContact",reader:new Ext.data.JsonReader({root:"results"},[{name:"contact_id"},{name:"contact_tid"},{name:"contact_owner"},{name:"contact_private"},{name:"cat_id"},{name:"n_family"},{name:"n_given"},{name:"n_middle"},{name:"n_prefix"},{name:"n_suffix"},{name:"n_fn"},{name:"n_fileas"},{name:"contact_bday"},{name:"org_name"},{name:"org_unit"},{name:"contact_title"},{name:"contact_role"},{name:"contact_assistent"},{name:"contact_room"},{name:"adr_one_street"},{name:"adr_one_street2"},{name:"adr_one_locality"},{name:"adr_one_region"},{name:"adr_one_postalcode"},{name:"adr_one_countryname"},{name:"contact_label"},{name:"adr_two_street"},{name:"adr_two_street2"},{name:"adr_two_locality"},{name:"adr_two_region"},{name:"adr_two_postalcode"},{name:"adr_two_countryname"},{name:"tel_work"},{name:"tel_cell"},{name:"tel_fax"},{name:"tel_assistent"},{name:"tel_car"},{name:"tel_pager"},{name:"tel_home"},{name:"tel_fax_home"},{name:"tel_cell_private"},{name:"tel_other"},{name:"tel_prefer"},{name:"contact_email"},{name:"contact_email_home"},{name:"contact_url"},{name:"contact_url_home"},{name:"contact_freebusy_uri"},{name:"contact_calendar_uri"},{name:"contact_note"},{name:"contact_tz"},{name:"contact_geo"},{name:"contact_pubkey"},{name:"contact_created"},{name:"contact_creator"},{name:"contact_modified"},{name:"contact_modifier"},{name:"contact_jpegphoto"},{name:"account_id"}])});L.on("beforeaction",function(P,j){P.baseParams={};P.baseParams._contactOwner=P.getValues().contact_owner;if(formData.values&&formData.values.contact_id){P.baseParams.contact_id=formData.values.contact_id;}});L.fieldset({legend:"Contact information"});L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.TextField({fieldLabel:"First Name",name:"n_given",width:175}),new Ext.form.TextField({fieldLabel:"Middle Name",name:"n_middle",width:175}),new Ext.form.TextField({fieldLabel:"Last Name",name:"n_family",width:175,allowBlank:false}));var J=new Ext.form.TriggerField({fieldLabel:"Addressbook",name:"contact_owner",width:175,readOnly:true});J.onTriggerClick=function(){test=Ext.Element.get("iWindowContAdrTag");if(test!=null){test.remove();}var j=Ext.Element.get(document.body);var z=j.createChild({tag:"div",id:"adrContainer"});var Z=z.createChild({tag:"div",id:"iWindowAdrTag"});var a=z.createChild({tag:"div",id:"iWindowContAdrTag"});if(!H){var H=new Ext.LayoutDialog("iWindowAdrTag",{modal:true,width:375,height:400,shadow:true,minWidth:375,title:"please select addressbook",minHeight:400,collapsible:false,autoTabs:false,proxyDrag:true,center:{autoScroll:true,tabPosition:"top",closeOnTab:true,alwaysShowTabs:false}});H.addKeyListener(27,H.hide,H);var P=Ext.tree;treeLoader=new P.TreeLoader({dataUrl:"index.php"});treeLoader.on("beforeload",function(V,F){V.baseParams.method=F.attributes.application+".getTree";V.baseParams.node=F.id;V.baseParams.datatype=F.attributes.datatype;V.baseParams.owner=F.attributes.owner;V.baseParams.modul="contactedit";},this);var g=new P.TreePanel("iWindowContAdrTag",{animate:true,loader:treeLoader,enableDD:true,ddGroup:"TreeDD",enableDrop:true,containerScroll:true,rootVisible:false});var M=new P.TreeNode({text:"root",draggable:false,allowDrop:false,id:"root"});g.setRootNode(M);M.appendChild(new P.AsyncTreeNode(application));g.render();g.expandPath("/root/addressbook/");g.on("click",function(){if(g.getSelectionModel().getSelectedNode()){var F=g.getSelectionModel().getSelectedNode().id;var V=g.getNodeById(F).attributes.owner;if((V>0)||(V<0)){L.setValues([{id:"contact_owner",value:V}]);H.hide();}else{Ext.MessageBox.alert("wrong selection","please select a valid addressbook");}}else{Ext.MessageBox.alert("no selection","please select an addressbook");}});var Q=H.getLayout();Q.beginUpdate();Q.add("center",new Ext.ContentPanel("iWindowContAdrTag",{autoCreate:true,fitContainer:true}));Q.endUpdate();}H.show();};L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.TextField({fieldLabel:"Prefix",name:"n_prefix",width:175}),new Ext.form.TextField({fieldLabel:"Suffix",name:"n_suffix",width:175}),J);L.end();L.fieldset({legend:"Business information"});L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.TextField({fieldLabel:"Company",name:"org_name",width:175}),new Ext.form.TextField({fieldLabel:"Street",name:"adr_one_street",width:175}),new Ext.form.TextField({fieldLabel:"Street 2",name:"adr_one_street2",width:175}),new Ext.form.TextField({fieldLabel:"Postalcode",name:"adr_one_postalcode",width:175}),new Ext.form.TextField({fieldLabel:"City",name:"adr_one_locality",width:175}),new Ext.form.TextField({fieldLabel:"Region",name:"adr_one_region",width:175}),new Ext.form.ComboBox({fieldLabel:"Country",name:"adr_one_countryname",hiddenName:"adr_one_countryname",store:N,displayField:"translatedName",valueField:"shortName",typeAhead:true,mode:"remote",triggerAction:"all",emptyText:"Select a state...",selectOnFocus:true,width:175}));L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.TextField({fieldLabel:"Phone",name:"tel_work",width:175}),new Ext.form.TextField({fieldLabel:"Cellphone",name:"tel_cell",width:175}),new Ext.form.TextField({fieldLabel:"Fax",name:"tel_fax",width:175}),new Ext.form.TextField({fieldLabel:"Car phone",name:"tel_car",width:175}),new Ext.form.TextField({fieldLabel:"Pager",name:"tel_pager",width:175}),new Ext.form.TextField({fieldLabel:"Email",name:"contact_email",vtype:"email",width:175}),new Ext.form.TextField({fieldLabel:"URL",name:"contact_url",vtype:"url",width:175}));L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.TextField({fieldLabel:"Unit",name:"org_unit",width:175}),new Ext.form.TextField({fieldLabel:"Role",name:"contact_role",width:175}),new Ext.form.TextField({fieldLabel:"Title",name:"contact_title",width:175}),new Ext.form.TextField({fieldLabel:"Room",name:"contact_room",width:175}),new Ext.form.TextField({fieldLabel:"Name Assistent",name:"contact_assistent",width:175}),new Ext.form.TextField({fieldLabel:"Phone Assistent",name:"tel_assistent",width:175}));L.end();L.fieldset({legend:"Private information"});L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.TextField({fieldLabel:"Street",name:"adr_two_street",width:175}),new Ext.form.TextField({fieldLabel:"Street2",name:"adr_two_street2",width:175}),new Ext.form.TextField({fieldLabel:"Postalcode",name:"adr_two_postalcode",width:175}),new Ext.form.TextField({fieldLabel:"City",name:"adr_two_locality",width:175}),new Ext.form.TextField({fieldLabel:"Region",name:"adr_two_region",width:175}),new Ext.form.ComboBox({fieldLabel:"Country",name:"adr_two_countryname",hiddenName:"adr_two_countryname",store:N,displayField:"translatedName",valueField:"shortName",typeAhead:true,mode:"remote",triggerAction:"all",emptyText:"Select a state...",selectOnFocus:true,width:175}));L.column({width:"33%",labelWidth:90,labelSeparator:""},new Ext.form.DateField({fieldLabel:"Birthday",name:"contact_bday",format:formData.config.dateFormat,altFormats:"Y-m-d",width:175}),new Ext.form.TextField({fieldLabel:"Phone",name:"tel_home",width:175}),new Ext.form.TextField({fieldLabel:"Cellphone",name:"tel_cell_private",width:175}),new Ext.form.TextField({fieldLabel:"Fax",name:"tel_fax_home",width:175}),new Ext.form.TextField({fieldLabel:"Email",name:"contact_email_home",vtype:"email",width:175}),new Ext.form.TextField({fieldLabel:"URL",name:"contact_url_home",vtype:"url",width:175}));L.column({width:"33%",labelSeparator:"",hideLabels:true},new Ext.form.TextArea({name:"contact_note",grow:false,preventScrollbars:false,width:"95%",maxLength:255,height:150}));L.end();var T=new Ext.form.TriggerField({fieldLabel:"Categories",name:"categories",width:320,readOnly:true});T.onTriggerClick=function(){var a=Ext.Element.get("container");var M=a.createChild({tag:"div",id:"iWindowTag"});var Z=a.createChild({tag:"div",id:"iWindowContTag"});var j=new Ext.data.SimpleStore({fields:["category_id","category_realname"],data:[["1","erste Kategorie"],["2","zweite Kategorie"],["3","dritte Kategorie"],["4","vierte Kategorie"],["5","fuenfte Kategorie"],["6","sechste Kategorie"],["7","siebte Kategorie"],["8","achte Kategorie"]]});j.load();ds_checked=new Ext.data.SimpleStore({fields:["category_id","category_realname"],data:[["2","zweite Kategorie"],["5","fuenfte Kategorie"],["6","sechste Kategorie"],["8","achte Kategorie"]]});ds_checked.load();var H=new Ext.form.Form({labelWidth:75,url:"index.php?method=Addressbook.saveAdditionalData",reader:new Ext.data.JsonReader({root:"results"},[{name:"category_id"},{name:"category_realname"},])});var P=1;var g=new Array();ds_checked.each(function(V){g[V.data.category_id]=V.data.category_realname;});j.each(function(V){if((P%12)==1){H.column({width:"33%",labelWidth:50,labelSeparator:""});}if(g[V.data.category_id]){H.add(new Ext.form.Checkbox({boxLabel:V.data.category_realname,name:V.data.category_realname,checked:true}));}else{H.add(new Ext.form.Checkbox({boxLabel:V.data.category_realname,name:V.data.category_realname}));}if((P%12)==0){H.end();}P=P+1;});H.render("iWindowContTag");if(!z){var z=new Ext.LayoutDialog("iWindowTag",{modal:true,width:700,height:400,shadow:true,minWidth:700,minHeight:400,autoTabs:true,proxyDrag:true,center:{autoScroll:true,tabPosition:"top",closeOnTab:true,alwaysShowTabs:true}});z.addKeyListener(27,this.hide);z.addButton("save",function(){Ext.MessageBox.alert("Todo","Not yet implemented!");z.hide;},z);z.addButton("cancel",function(){Ext.MessageBox.alert("Todo","Not yet implemented!");z.hide;},z);var Q=z.getLayout();Q.beginUpdate();Q.add("center",new Ext.ContentPanel("iWindowContTag",{autoCreate:true,title:"Category"}));Q.endUpdate();}z.show();};L.column({width:"45%",labelWidth:80,labelSeparator:" ",labelAlign:"right"},T);var f=new Ext.form.TriggerField({fieldLabel:"Lists",name:"lists",width:320,readOnly:true});f.onTriggerClick=function(){var a=Ext.Element.get("container");var M=a.createChild({tag:"div",id:"iWindowTag"});var Z=a.createChild({tag:"div",id:"iWindowContTag"});var j=new Ext.data.SimpleStore({fields:["list_id","list_realname"],data:[["1","Liste A"],["2","Liste B"],["3","Liste C"],["4","Liste D"],["5","Liste E"],["6","Liste F"],["7","Liste G"],["8","Liste H"]]});j.load();ds_checked=new Ext.data.SimpleStore({fields:["list_id","list_realname"],data:[["2","Liste B"],["5","Liste E"],["6","Liste F"],["8","Liste H"]]});ds_checked.load();var H=new Ext.form.Form({labelWidth:75,url:"index.php?method=Addressbook.saveAdditionalData",reader:new Ext.data.JsonReader({root:"results"},[{name:"list_id"},{name:"list_realname"},])});var P=1;var g=new Array();ds_checked.each(function(V){g[V.data.list_id]=V.data.list_realname;});j.each(function(V){if((P%12)==1){H.column({width:"33%",labelWidth:50,labelSeparator:""});}if(g[V.data.list_id]){H.add(new Ext.form.Checkbox({boxLabel:V.data.list_realname,name:V.data.list_realname,checked:true}));}else{H.add(new Ext.form.Checkbox({boxLabel:V.data.list_realname,name:V.data.list_realname}));}if((P%12)==0){H.end();}P=P+1;});H.render("iWindowContTag");if(!z){var z=new Ext.LayoutDialog("iWindowTag",{modal:true,width:700,height:400,shadow:true,minWidth:700,minHeight:400,autoTabs:true,proxyDrag:true,center:{autoScroll:true,tabPosition:"top",closeOnTab:true,alwaysShowTabs:true}});z.addKeyListener(27,this.hide);z.addButton("save",function(){Ext.MessageBox.alert("Todo","Not yet implemented!");},z);z.addButton("cancel",function(){window.location.reload();z.hide;},z);var Q=z.getLayout();Q.beginUpdate();Q.add("center",new Ext.ContentPanel("iWindowContTag",{autoCreate:true,title:"Lists"}));Q.endUpdate();}z.show();};L.column({width:"45%",labelWidth:80,labelSeparator:" ",labelAlign:"right"},f);L.column({width:"10%",labelWidth:50,labelSeparator:" ",labelAlign:"right"},new Ext.form.Checkbox({fieldLabel:"Private",name:"categories",width:10}));L.render("content");return L;};var w=function(C,L){for(var J in L){var c=C.findField(J);if(c){c.setValue(L[J]);}}};return {show:s,reload:function(){t.reload();},handleDragDrop:function(c){alert("Best Regards From Addressbook");},openDialog:function(){E();},displayContactDialog:function(){var c=U();if(formData.values){w(c,formData.values);}}};}();Egw.Addressbook.ListEditDialog=function(){var q=function(){Ext.QuickTips.init();Ext.form.Field.prototype.msgTarget="side";var S=new Ext.BorderLayout(document.body,{north:{split:false,initialSize:28},center:{split:false,initialSize:70},south:{split:false,initialSize:350,autoScroll:true}});S.beginUpdate();S.add("north",new Ext.ContentPanel("header",{fitToFrame:true}));S.add("center",new Ext.ContentPanel("content",{fitToFrame:true}));S.add("south",new Ext.ContentPanel("south",{fitToFrame:true}));S.endUpdate();var E=true;if(formData.values){E=false;}var W=new Ext.Toolbar("header");W.add({id:"savebtn",cls:"x-btn-text-icon",text:"Save and Close",icon:"images/oxygen/22x22/actions/document-save.png",tooltip:"save this list and close window",onClick:function(){if(m.isValid()){var i={};if(formData.values){i.contact_id=formData.values.contact_id;}m.submit({waitTitle:"Please wait!",waitMsg:"saving contact...",params:i,success:function(B,k,p){window.opener.Egw.Addressbook.reload();window.setTimeout("window.close()",400);},failure:function(B,k){}});}else{Ext.MessageBox.alert("Errors","Please fix the errors noted.");}}},{id:"savebtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/save-all.png",tooltip:"apply changes for this list",onClick:function(){if(m.isValid()){var i={};if(formData.values){i.contact_id=formData.values.contact_id;}m.submit({waitTitle:"Please wait!",waitMsg:"saving contact...",params:i,success:function(B,k,p){window.opener.Egw.Addressbook.reload();},failure:function(B,k){}});}else{Ext.MessageBox.alert("Errors","Please fix the errors noted.");}}},{id:"deletebtn",cls:"x-btn-icon-22",icon:"images/oxygen/22x22/actions/edit-delete.png",tooltip:"delete this contact",disabled:E,handler:function(B,i){if(formData.values.contact_id){Ext.MessageBox.wait("Deleting contact...","Please wait!");_deleteContact([formData.values.contact_id]);_reloadMainWindow(true);}}});var b=new Ext.data.SimpleStore({fields:["id","addressbooks"],data:formData.config.addressbooks});var v=Ext.Element.get("content");var m=new Ext.form.Form({labelWidth:75,url:"index.php",baseParams:{method:"Addressbook.saveList"}});m.on("beforeaction",function(B,i){B.baseParams._listOwner=B.getValues().list_owner;B.baseParams._listmembers=w(t);if(formData.values&&formData.values.list_id){B.baseParams._listId=formData.values.list_id;}else{B.baseParams._listId="";}});var s=new Ext.form.TriggerField({fieldLabel:"Addressbook",name:"list_owner",width:325,readOnly:true});s.onTriggerClick=function(){test=Ext.Element.get("iWindowContAdrTag");if(test!=null){test.remove();}var i=Ext.Element.get(document.body);var p=i.createChild({tag:"div",id:"adrContainer"});var Y=p.createChild({tag:"div",id:"iWindowAdrTag"});var l=p.createChild({tag:"div",id:"iWindowContAdrTag"});if(!c){var c=new Ext.LayoutDialog("iWindowAdrTag",{modal:true,width:375,height:400,shadow:true,title:"please select addressbook",minWidth:375,collapsible:false,minHeight:400,autoTabs:false,proxyDrag:true,center:{autoScroll:true,tabPosition:"top",closeOnTab:true,alwaysShowTabs:false}});c.addKeyListener(27,c.hide,c);var B=Ext.tree;treeLoader=new B.TreeLoader({dataUrl:"index.php"});treeLoader.on("beforeload",function(L,J){L.baseParams.method=J.attributes.application+".getTree";L.baseParams.node=J.id;L.baseParams.datatype=J.attributes.datatype;L.baseParams.owner=J.attributes.owner;L.baseParams.modul="contactedit";},this);var C=new B.TreePanel("iWindowContAdrTag",{animate:true,loader:treeLoader,enableDD:true,ddGroup:"TreeDD",enableDrop:true,containerScroll:true,rootVisible:false});var X=new B.TreeNode({text:"root",draggable:false,allowDrop:false,id:"root"});C.setRootNode(X);X.appendChild(new B.AsyncTreeNode(application));C.render();C.expandPath("/root/addressbook/");C.on("click",function(){if(C.getSelectionModel().getSelectedNode()){var J=C.getSelectionModel().getSelectedNode().id;var L=C.getNodeById(J).attributes.owner;if((L>0)||(L<0)){m.setValues([{id:"list_owner",value:L}]);c.hide();}else{Ext.MessageBox.alert("wrong selection","please select a valid addressbook");}}else{Ext.MessageBox.alert("no selection","please select an addressbook");}});var k=c.getLayout();k.beginUpdate();k.add("center",new Ext.ContentPanel("iWindowContAdrTag",{autoCreate:true,fitContainer:true}));k.endUpdate();}c.show();};m.fieldset({legend:"list information"});m.column({width:"100%",labelWidth:90,labelSeparator:""},s,new Ext.form.TextField({fieldLabel:"List Name",name:"list_name",width:325}),new Ext.form.TextArea({fieldLabel:"List Description",name:"list_description",width:325,grow:false}));m.end();if(formData.values){var u=formData.values.list_owner;var G=formData.values.list_id;}else{var u=-1;var G=-1;}searchDS=new Ext.data.JsonStore({url:"index.php",baseParams:{method:"Addressbook.getOverview",owner:u,options:"{\"displayContacts\":true,\"displayLists\":false}",},root:"results",totalProperty:"totalcount",id:"contact_id",fields:[{name:"contact_id"},{name:"n_family"},{name:"n_given"},{name:"contact_email"}],remoteSort:true,success:function(i,B){},failure:function(i,B){}});searchDS.setDefaultSort("n_family","asc");var I=new Ext.Template("<div class=\"search-item\">","{n_family}, {n_given} {contact_email}","</div>");var A=new Ext.form.ComboBox({store:searchDS,displayField:"n_family",typeAhead:false,loadingText:"Searching...",width:415,pageSize:10,hideTrigger:true,tpl:I,onSelect:function(B){var i=new h({contact_id:B.data.contact_id,n_family:B.data.n_family,contact_email:B.data.contact_email});t.add(i);t.sort("n_family");A.reset();A.collapse();}});A.on("specialkey",function(c,k){if(searchDS.getCount()==0){var X=/^[a-z0-9_-]+(\.[a-z0-9_-]+)*@([0-9a-z][0-9a-z-]*[0-9a-z]\.)+([a-z]{2,4}|museum)$/;var B=X.exec(A.getValue());if(B&&(k.getKey()==k.ENTER||k.getKey()==e.RETURN)){var Y=A.getValue();var i=Y.indexOf("@");if(i!=-1){var l=Ext.util.Format.capitalize(Y.substr(0,i));}else{var l=Y;}var p=new h({contact_id:"-1",n_family:l,contact_email:Y});t.add(p);t.sort("n_family");A.reset();}}});m.fieldset({legend:"select new list members"});m.column({width:"100%",labelWidth:0,labelSeparator:""},A);m.end();m.render("content");var h=Ext.data.Record.create([{name:"contact_id",type:"int"},{name:"n_family",type:"string"},{name:"contact_email",type:"string"}]);if(formData.values){var K=formData.values.list_members;}var t=new Ext.data.SimpleStore({fields:["contact_id","n_family","contact_email"],data:K});t.sort("n_family","ASC");var d=new Ext.grid.ColumnModel([{resizable:true,id:"n_family",header:"Family name",dataIndex:"n_family"},{resizable:true,id:"contact_email",header:"eMail address",dataIndex:"contact_email"}]);d.defaultSortable=true;var r=new Ext.grid.Grid("south",{ds:t,cm:d,selModel:new Ext.grid.RowSelectionModel({multiSelect:true}),autoSizeColumns:true,monitorWindowResize:false,trackMouseOver:true,contextMenu:"ctxListMenu",autoExpandColumn:"contact_email"});r.on("rowcontextmenu",function(k,p,B){B.stopEvent();var i=k.getDataSource().getAt(p);if(i.data.contact_tid=="l"){U.showAt(B.getXY());}else{U.showAt(B.getXY());}});r.render("south");var D=function(Y,B){var p=Array();var l=r.getSelectionModel().getSelections();for(var k=0;k<l.length;++k){t.remove(l[k]);}};var U=new Ext.menu.Menu({id:"ctxListMenu",items:[{id:"delete",text:"delete entry",icon:"images/oxygen/16x16/actions/edit-delete.png",handler:D}]});return m;};var R=function(v,E){v.findField("list_name").setValue(E["list_name"]);v.findField("list_description").setValue(E["list_description"]);v.findField("list_owner").setValue(E["list_owner"]);};var w=function(E){var v=new Array();E.each(function(b){v.push(b.data);},this);return Ext.util.JSON.encode(v);};return {display:function(){var v=q();if(formData.values){R(v,formData.values);}}};}();