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
define(["./defaultValue-9e6a554b","./Transforms-dd65ca14","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b"],(function(e,t,n,r,a,i,o,u,c){"use strict";function s(){this._workerName="createPlaneOutlineGeometry"}s.packedLength=0,s.pack=function(e,t){return t},s.unpack=function(t,n,r){return e.defined(r)?r:new s};const y=new n.Cartesian3(-.5,-.5,0),m=new n.Cartesian3(.5,.5,0);return s.createGeometry=function(){const e=new i.GeometryAttributes,o=new Uint16Array(8),u=new Float64Array(12);return u[0]=y.x,u[1]=y.y,u[2]=y.z,u[3]=m.x,u[4]=y.y,u[5]=y.z,u[6]=m.x,u[7]=m.y,u[8]=y.z,u[9]=y.x,u[10]=m.y,u[11]=y.z,e.position=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u}),o[0]=0,o[1]=1,o[2]=1,o[3]=2,o[4]=2,o[5]=3,o[6]=3,o[7]=0,new a.Geometry({attributes:e,indices:o,primitiveType:a.PrimitiveType.LINES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=s.unpack(t,n)),s.createGeometry(t)}}));
