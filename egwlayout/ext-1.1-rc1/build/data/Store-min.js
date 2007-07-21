/*
 * Ext JS Library 1.1 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext.data.Store=function(_1){this.data=new Ext.util.MixedCollection(false);this.data.getKey=function(o){return o.id;};this.baseParams={};this.paramNames={"start":"start","limit":"limit","sort":"sort","dir":"dir"};if(_1&&_1.data){this.inlineData=_1.data;delete _1.data;}Ext.apply(this,_1);if(this.reader){if(!this.recordType){this.recordType=this.reader.recordType;}if(this.reader.onMetaChange){this.reader.onMetaChange=this.onMetaChange.createDelegate(this);}}if(this.recordType){this.fields=this.recordType.prototype.fields;}this.modified=[];this.addEvents({datachanged:true,metachange:true,add:true,remove:true,update:true,clear:true,beforeload:true,load:true,loadexception:true});if(this.proxy){this.relayEvents(this.proxy,["loadexception"]);}this.sortToggle={};Ext.data.Store.superclass.constructor.call(this);if(this.inlineData){this.loadData(this.inlineData);delete this.inlineData;}};Ext.extend(Ext.data.Store,Ext.util.Observable,{remoteSort:false,lastOptions:null,add:function(_3){_3=[].concat(_3);for(var i=0,_5=_3.length;i<_5;i++){_3[i].join(this);}var _6=this.data.length;this.data.addAll(_3);this.fireEvent("add",this,_3,_6);},remove:function(_7){var _8=this.data.indexOf(_7);this.data.removeAt(_8);this.fireEvent("remove",this,_7,_8);},removeAll:function(){this.data.clear();this.fireEvent("clear",this);},insert:function(_9,_a){_a=[].concat(_a);for(var i=0,_c=_a.length;i<_c;i++){this.data.insert(_9,_a[i]);_a[i].join(this);}this.fireEvent("add",this,_a,_9);},indexOf:function(_d){return this.data.indexOf(_d);},indexOfId:function(id){return this.data.indexOfKey(id);},getById:function(id){return this.data.key(id);},getAt:function(_10){return this.data.itemAt(_10);},getRange:function(_11,end){return this.data.getRange(_11,end);},storeOptions:function(o){o=Ext.apply({},o);delete o.callback;delete o.scope;this.lastOptions=o;},load:function(_14){_14=_14||{};if(this.fireEvent("beforeload",this,_14)!==false){this.storeOptions(_14);var p=Ext.apply(_14.params||{},this.baseParams);if(this.sortInfo&&this.remoteSort){var pn=this.paramNames;p[pn["sort"]]=this.sortInfo.field;p[pn["dir"]]=this.sortInfo.direction;}this.proxy.load(p,this.reader,this.loadRecords,this,_14);}},reload:function(_17){this.load(Ext.applyIf(_17||{},this.lastOptions));},loadRecords:function(o,_19,_1a){if(!o||_1a===false){if(_1a!==false){this.fireEvent("load",this,[],_19);}if(_19.callback){_19.callback.call(_19.scope||this,[],_19,false);}return;}var r=o.records,t=o.totalRecords||r.length;if(!_19||_19.add!==true){for(var i=0,len=r.length;i<len;i++){r[i].join(this);}this.data.clear();this.data.addAll(r);this.totalLength=t;this.applySort();this.fireEvent("datachanged",this);}else{this.totalLength=Math.max(t,this.data.length+r.length);this.add(r);}this.fireEvent("load",this,r,_19);if(_19.callback){_19.callback.call(_19.scope||this,r,_19,true);}},loadData:function(o,_20){var r=this.reader.readRecords(o);this.loadRecords(r,{add:_20},true);},getCount:function(){return this.data.length||0;},getTotalCount:function(){return this.totalLength||0;},getSortState:function(){return this.sortInfo;},applySort:function(){if(this.sortInfo&&!this.remoteSort){var s=this.sortInfo,f=s.field;var st=this.fields.get(f).sortType;var fn=function(r1,r2){var v1=st(r1.data[f]),v2=st(r2.data[f]);return v1>v2?1:(v1<v2?-1:0);};this.data.sort(s.direction,fn);if(this.snapshot&&this.snapshot!=this.data){this.snapshot.sort(s.direction,fn);}}},setDefaultSort:function(_2a,dir){this.sortInfo={field:_2a,direction:dir?dir.toUpperCase():"ASC"};},sort:function(_2c,dir){var f=this.fields.get(_2c);if(!dir){if(this.sortInfo&&this.sortInfo.field==f.name){dir=(this.sortToggle[f.name]||"ASC").toggle("ASC","DESC");}else{dir=f.sortDir;}}this.sortToggle[f.name]=dir;this.sortInfo={field:f.name,direction:dir};if(!this.remoteSort){this.applySort();this.fireEvent("datachanged",this);}else{this.load(this.lastOptions);}},each:function(fn,_30){this.data.each(fn,_30);},getModifiedRecords:function(){return this.modified;},createFilterFn:function(_31,_32,_33){if(!_32.exec){_32=String(_32);if(_32.length==0){return false;}_32=new RegExp((_33===true?"":"^")+Ext.escapeRe(_32),"i");}return function(r){return _32.test(r.data[_31]);};},sum:function(_35,_36,end){var rs=this.data.items,v=0;_36=_36||0;end=(end||end===0)?end:rs.length-1;for(var i=_36;i<=end;i++){v+=(rs[i].data[_35]||0);}return v;},filter:function(_3b,_3c,_3d){var fn=this.createFilterFn(_3b,_3c,_3d);return fn?this.filterBy(fn):this.clearFilter();},filterBy:function(fn,_40){this.snapshot=this.snapshot||this.data;this.data=this.queryBy(fn,_40||this);this.fireEvent("datachanged",this);},query:function(_41,_42,_43){var fn=this.createFilterFn(_41,_42,_43);return fn?this.queryBy(fn):this.data.clone();},queryBy:function(fn,_46){var _47=this.snapshot||this.data;return _47.filterBy(fn,_46||this);},collect:function(_48,_49,_4a){var d=(_4a===true&&this.snapshot)?this.snapshot.items:this.data.items;var v,sv,r=[],l={};for(var i=0,len=d.length;i<len;i++){v=d[i].data[_48];sv=String(v);if((_49||!Ext.isEmpty(v))&&!l[sv]){l[sv]=true;r[r.length]=v;}}return r;},clearFilter:function(_52){if(this.snapshot&&this.snapshot!=this.data){this.data=this.snapshot;delete this.snapshot;if(_52!==true){this.fireEvent("datachanged",this);}}},afterEdit:function(_53){if(this.modified.indexOf(_53)==-1){this.modified.push(_53);}this.fireEvent("update",this,_53,Ext.data.Record.EDIT);},afterReject:function(_54){this.modified.remove(_54);this.fireEvent("update",this,_54,Ext.data.Record.REJECT);},afterCommit:function(_55){this.modified.remove(_55);this.fireEvent("update",this,_55,Ext.data.Record.COMMIT);},commitChanges:function(){var m=this.modified.slice(0);this.modified=[];for(var i=0,len=m.length;i<len;i++){m[i].commit();}},rejectChanges:function(){var m=this.modified.slice(0);this.modified=[];for(var i=0,len=m.length;i<len;i++){m[i].reject();}},onMetaChange:function(_5c,_5d,o){this.recordType=_5d;this.fields=_5d.prototype.fields;delete this.snapshot;this.sortInfo=_5c.sortInfo;this.modified=[];this.fireEvent("metachange",this,this.reader.meta);}});