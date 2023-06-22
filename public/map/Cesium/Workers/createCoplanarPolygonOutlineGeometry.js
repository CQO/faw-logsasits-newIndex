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
define(["./arrayRemoveDuplicates-46e19274","./Transforms-dd65ca14","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./CoplanarPolygonGeometryLibrary-7831e3cc","./defaultValue-9e6a554b","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./GeometryInstance-f2f89e81","./GeometryPipeline-cb21a69b","./IndexDatatype-83664323","./PolygonGeometryLibrary-7b0e733f","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b","./OrientedBoundingBox-2ab3cca0","./EllipsoidTangentPlane-2c14c21e","./AxisAlignedBoundingBox-c134be37","./IntersectionTests-5d845af1","./Plane-6d3de2d4","./AttributeCompression-d23e49ed","./EncodedCartesian3-56641829","./ArcType-ca475ddd","./EllipsoidRhumbLine-d4d28c7f","./PolygonPipeline-db098d88"],(function(e,t,n,o,r,i,a,c,y,l,s,u,p,d,m,g,f,b,h,P,G,L,C,T,E){"use strict";function A(e){const t=e.length,n=new Float64Array(3*t),r=s.IndexDatatype.createTypedArray(t,2*t);let i=0,y=0;for(let o=0;o<t;o++){const a=e[o];n[i++]=a.x,n[i++]=a.y,n[i++]=a.z,r[y++]=o,r[y++]=(o+1)%t}const l=new c.GeometryAttributes({position:new a.GeometryAttribute({componentDatatype:o.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new a.Geometry({attributes:l,indices:r,primitiveType:a.PrimitiveType.LINES})}function H(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=t,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=u.PolygonGeometryLibrary.computeHierarchyPackedLength(t,n.Cartesian3)+1}H.fromPositions=function(e){return new H({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions}})},H.pack=function(e,t,o){return o=i.defaultValue(o,0),t[o=u.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,o,n.Cartesian3)]=e.packedLength,t};const k={polygonHierarchy:{}};return H.unpack=function(e,t,o){t=i.defaultValue(t,0);const r=u.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,n.Cartesian3);t=r.startingIndex,delete r.startingIndex;const a=e[t];return i.defined(o)||(o=new H(k)),o._polygonHierarchy=r,o.packedLength=a,o},H.createGeometry=function(o){const i=o._polygonHierarchy;let c=i.positions;if(c=e.arrayRemoveDuplicates(c,n.Cartesian3.equalsEpsilon,!0),c.length<3)return;if(!r.CoplanarPolygonGeometryLibrary.validOutline(c))return;const s=u.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(i,!1);if(0===s.length)return;const p=[];for(let e=0;e<s.length;e++){const t=new y.GeometryInstance({geometry:A(s[e])});p.push(t)}const d=l.GeometryPipeline.combineInstances(p)[0],m=t.BoundingSphere.fromPoints(i.positions);return new a.Geometry({attributes:d.attributes,indices:d.indices,primitiveType:d.primitiveType,boundingSphere:m})},function(e,t){return i.defined(t)&&(e=H.unpack(e,t)),e._ellipsoid=n.Ellipsoid.clone(e._ellipsoid),H.createGeometry(e)}}));
