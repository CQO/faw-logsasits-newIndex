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
define(["./defaultValue-9e6a554b","./Transforms-dd65ca14","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./VertexFormat-32d2e9ac","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b"],(function(e,t,n,r,a,o,i,m,u,c){"use strict";function p(t){t=e.defaultValue(t,e.defaultValue.EMPTY_OBJECT);const n=e.defaultValue(t.vertexFormat,i.VertexFormat.DEFAULT);this._vertexFormat=n,this._workerName="createPlaneGeometry"}p.packedLength=i.VertexFormat.packedLength,p.pack=function(t,n,r){return r=e.defaultValue(r,0),i.VertexFormat.pack(t._vertexFormat,n,r),n};const s=new i.VertexFormat,y={vertexFormat:s};p.unpack=function(t,n,r){n=e.defaultValue(n,0);const a=i.VertexFormat.unpack(t,n,s);return e.defined(r)?(r._vertexFormat=i.VertexFormat.clone(a,r._vertexFormat),r):new p(y)};const l=new n.Cartesian3(-.5,-.5,0),f=new n.Cartesian3(.5,.5,0);return p.createGeometry=function(e){const i=e._vertexFormat,m=new o.GeometryAttributes;let u,c;if(i.position){if(c=new Float64Array(12),c[0]=l.x,c[1]=l.y,c[2]=0,c[3]=f.x,c[4]=l.y,c[5]=0,c[6]=f.x,c[7]=f.y,c[8]=0,c[9]=l.x,c[10]=f.y,c[11]=0,m.position=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),i.normal){const e=new Float32Array(12);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=0,e[5]=1,e[6]=0,e[7]=0,e[8]=1,e[9]=0,e[10]=0,e[11]=1,m.normal=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(i.st){const e=new Float32Array(8);e[0]=0,e[1]=0,e[2]=1,e[3]=0,e[4]=1,e[5]=1,e[6]=0,e[7]=1,m.st=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:e})}if(i.tangent){const e=new Float32Array(12);e[0]=1,e[1]=0,e[2]=0,e[3]=1,e[4]=0,e[5]=0,e[6]=1,e[7]=0,e[8]=0,e[9]=1,e[10]=0,e[11]=0,m.tangent=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}if(i.bitangent){const e=new Float32Array(12);e[0]=0,e[1]=1,e[2]=0,e[3]=0,e[4]=1,e[5]=0,e[6]=0,e[7]=1,e[8]=0,e[9]=0,e[10]=1,e[11]=0,m.bitangent=new a.GeometryAttribute({componentDatatype:r.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:e})}u=new Uint16Array(6),u[0]=0,u[1]=1,u[2]=2,u[3]=0,u[4]=2,u[5]=3}return new a.Geometry({attributes:m,indices:u,primitiveType:a.PrimitiveType.TRIANGLES,boundingSphere:new t.BoundingSphere(n.Cartesian3.ZERO,Math.sqrt(2))})},function(t,n){return e.defined(n)&&(t=p.unpack(t,n)),p.createGeometry(t)}}));
