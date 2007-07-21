/*
 * Ext JS Library 1.1 RC 1
 * Copyright(c) 2006-2007, Ext JS, LLC.
 * licensing@extjs.com
 * 
 * http://www.extjs.com/license
 */


Ext.grid.HeaderDragZone=function(_1,hd,_3){this.grid=_1;this.view=_1.getView();this.ddGroup="gridHeader"+this.grid.getGridEl().id;Ext.grid.HeaderDragZone.superclass.constructor.call(this,hd);if(_3){this.setHandleElId(Ext.id(hd));this.setOuterHandleElId(Ext.id(_3));}this.scroll=false;};Ext.extend(Ext.grid.HeaderDragZone,Ext.dd.DragZone,{maxDragWidth:120,getDragData:function(e){var t=Ext.lib.Event.getTarget(e);var h=this.view.findHeaderCell(t);if(h){return{ddel:h.firstChild,header:h};}return false;},onInitDrag:function(e){this.view.headersDisabled=true;var _8=this.dragData.ddel.cloneNode(true);_8.id=Ext.id();_8.style.width=Math.min(this.dragData.header.offsetWidth,this.maxDragWidth)+"px";this.proxy.update(_8);return true;},afterValidDrop:function(){var v=this.view;setTimeout(function(){v.headersDisabled=false;},50);},afterInvalidDrop:function(){var v=this.view;setTimeout(function(){v.headersDisabled=false;},50);}});Ext.grid.HeaderDropZone=function(_b,hd,_d){this.grid=_b;this.view=_b.getView();this.proxyTop=Ext.DomHelper.append(document.body,{cls:"col-move-top",html:"&#160;"},true);this.proxyBottom=Ext.DomHelper.append(document.body,{cls:"col-move-bottom",html:"&#160;"},true);this.proxyTop.hide=this.proxyBottom.hide=function(){this.setLeftTop(-100,-100);this.setStyle("visibility","hidden");};this.ddGroup="gridHeader"+this.grid.getGridEl().id;Ext.grid.HeaderDropZone.superclass.constructor.call(this,_b.getGridEl().dom);};Ext.extend(Ext.grid.HeaderDropZone,Ext.dd.DropZone,{proxyOffsets:[-4,-9],fly:Ext.Element.fly,getTargetFromEvent:function(e){var t=Ext.lib.Event.getTarget(e);var _10=this.view.findCellIndex(t);if(_10!==false){return this.view.getHeaderCell(_10);}},nextVisible:function(h){var v=this.view,cm=this.grid.colModel;h=h.nextSibling;while(h){if(!cm.isHidden(v.getCellIndex(h))){return h;}h=h.nextSibling;}return null;},prevVisible:function(h){var v=this.view,cm=this.grid.colModel;h=h.prevSibling;while(h){if(!cm.isHidden(v.getCellIndex(h))){return h;}h=h.prevSibling;}return null;},positionIndicator:function(h,n,e){var x=Ext.lib.Event.getPageX(e);var r=Ext.lib.Dom.getRegion(n.firstChild);var px,pt,py=r.top+this.proxyOffsets[1];if((r.right-x)<=(r.right-r.left)/2){px=r.right+this.view.borderWidth;pt="after";}else{px=r.left;pt="before";}var _1f=this.view.getCellIndex(h);var _20=this.view.getCellIndex(n);if(this.grid.colModel.isFixed(_20)){return false;}var _21=this.grid.colModel.isLocked(_20);if(pt=="after"){_20++;}if(_1f<_20){_20--;}if(_1f==_20&&(_21==this.grid.colModel.isLocked(_1f))){return false;}px+=this.proxyOffsets[0];this.proxyTop.setLeftTop(px,py);this.proxyTop.show();if(!this.bottomOffset){this.bottomOffset=this.view.mainHd.getHeight();}this.proxyBottom.setLeftTop(px,py+this.proxyTop.dom.offsetHeight+this.bottomOffset);this.proxyBottom.show();return pt;},onNodeEnter:function(n,dd,e,_25){if(_25.header!=n){this.positionIndicator(_25.header,n,e);}},onNodeOver:function(n,dd,e,_29){var _2a=false;if(_29.header!=n){_2a=this.positionIndicator(_29.header,n,e);}if(!_2a){this.proxyTop.hide();this.proxyBottom.hide();}return _2a?this.dropAllowed:this.dropNotAllowed;},onNodeOut:function(n,dd,e,_2e){this.proxyTop.hide();this.proxyBottom.hide();},onNodeDrop:function(n,dd,e,_32){var h=_32.header;if(h!=n){var cm=this.grid.colModel;var x=Ext.lib.Event.getPageX(e);var r=Ext.lib.Dom.getRegion(n.firstChild);var pt=(r.right-x)<=((r.right-r.left)/2)?"after":"before";var _38=this.view.getCellIndex(h);var _39=this.view.getCellIndex(n);var _3a=cm.isLocked(_39);if(pt=="after"){_39++;}if(_38<_39){_39--;}if(_38==_39&&(_3a==cm.isLocked(_38))){return false;}cm.setLocked(_38,_3a,true);cm.moveColumn(_38,_39);this.grid.fireEvent("columnmove",_38,_39);return true;}return false;}});Ext.grid.GridView.ColumnDragZone=function(_3b,hd){Ext.grid.GridView.ColumnDragZone.superclass.constructor.call(this,_3b,hd,null);this.proxy.el.addClass("x-grid3-col-dd");};Ext.extend(Ext.grid.GridView.ColumnDragZone,Ext.grid.HeaderDragZone,{handleMouseDown:function(e){},callHandleMouseDown:function(e){Ext.grid.GridView.ColumnDragZone.superclass.handleMouseDown.call(this,e);}});