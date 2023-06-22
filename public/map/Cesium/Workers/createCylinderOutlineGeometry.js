/**
 * @license
 * Cesium - https://github.com/CesiumGS/cesium
 * Version 1.97
 *
 * Copyright 2011-2022 Cesium Contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Columbus View (Pat. Pend.)
 *
 * Portions licensed separately.
 * See https://github.com/CesiumGS/cesium/blob/main/LICENSE.md for full licensing details.
 */
define(["./Transforms-dd65ca14","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./CylinderGeometryLibrary-f7ec3b26","./defaultValue-9e6a554b","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./GeometryOffsetAttribute-2ef72ea5","./IndexDatatype-83664323","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b"],(function(t,e,i,n,o,r,a,s,u,f,c,d){"use strict";const l=new e.Cartesian2;function m(t){const e=(t=o.defaultValue(t,o.defaultValue.EMPTY_OBJECT)).length,i=t.topRadius,n=t.bottomRadius,r=o.defaultValue(t.slices,128),a=Math.max(o.defaultValue(t.numberOfVerticalLines,16),0);this._length=e,this._topRadius=i,this._bottomRadius=n,this._slices=r,this._numberOfVerticalLines=a,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderOutlineGeometry"}m.packedLength=6,m.pack=function(t,e,i){return i=o.defaultValue(i,0),e[i++]=t._length,e[i++]=t._topRadius,e[i++]=t._bottomRadius,e[i++]=t._slices,e[i++]=t._numberOfVerticalLines,e[i]=o.defaultValue(t._offsetAttribute,-1),e};const b={length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,numberOfVerticalLines:void 0,offsetAttribute:void 0};return m.unpack=function(t,e,i){e=o.defaultValue(e,0);const n=t[e++],r=t[e++],a=t[e++],s=t[e++],u=t[e++],f=t[e];return o.defined(i)?(i._length=n,i._topRadius=r,i._bottomRadius=a,i._slices=s,i._numberOfVerticalLines=u,i._offsetAttribute=-1===f?void 0:f,i):(b.length=n,b.topRadius=r,b.bottomRadius=a,b.slices=s,b.numberOfVerticalLines=u,b.offsetAttribute=-1===f?void 0:f,new m(b))},m.createGeometry=function(f){let c=f._length;const d=f._topRadius,m=f._bottomRadius,b=f._slices,p=f._numberOfVerticalLines;if(c<=0||d<0||m<0||0===d&&0===m)return;const y=2*b,_=n.CylinderGeometryLibrary.computePositions(c,d,m,b,!1);let h,A=2*b;if(p>0){const t=Math.min(p,b);h=Math.round(b/t),A+=t}const R=u.IndexDatatype.createTypedArray(y,2*A);let G,O=0;for(G=0;G<b-1;G++)R[O++]=G,R[O++]=G+1,R[O++]=G+b,R[O++]=G+1+b;if(R[O++]=b-1,R[O++]=0,R[O++]=b+b-1,R[O++]=b,p>0)for(G=0;G<b;G+=h)R[O++]=G,R[O++]=G+b;const V=new a.GeometryAttributes;V.position=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:_}),l.x=.5*c,l.y=Math.max(m,d);const L=new t.BoundingSphere(e.Cartesian3.ZERO,e.Cartesian2.magnitude(l));if(o.defined(f._offsetAttribute)){c=_.length;const t=f._offsetAttribute===s.GeometryOffsetAttribute.NONE?0:1,e=new Uint8Array(c/3).fill(t);V.applyOffset=new r.GeometryAttribute({componentDatatype:i.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e})}return new r.Geometry({attributes:V,indices:R,primitiveType:r.PrimitiveType.LINES,boundingSphere:L,offsetAttribute:f._offsetAttribute})},function(t,e){return o.defined(e)&&(t=m.unpack(t,e)),m.createGeometry(t)}}));
