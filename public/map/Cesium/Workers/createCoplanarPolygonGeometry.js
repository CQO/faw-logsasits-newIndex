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
define(["./arrayRemoveDuplicates-46e19274","./BoundingRectangle-c55b9c13","./Transforms-dd65ca14","./Matrix2-474e79ca","./ComponentDatatype-bd805364","./CoplanarPolygonGeometryLibrary-7831e3cc","./defaultValue-9e6a554b","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./GeometryInstance-f2f89e81","./GeometryPipeline-cb21a69b","./IndexDatatype-83664323","./PolygonGeometryLibrary-7b0e733f","./PolygonPipeline-db098d88","./VertexFormat-32d2e9ac","./combine-e8ef3dac","./RuntimeError-671c2607","./WebGLConstants-f98c7b4b","./OrientedBoundingBox-2ab3cca0","./EllipsoidTangentPlane-2c14c21e","./AxisAlignedBoundingBox-c134be37","./IntersectionTests-5d845af1","./Plane-6d3de2d4","./AttributeCompression-d23e49ed","./EncodedCartesian3-56641829","./ArcType-ca475ddd","./EllipsoidRhumbLine-d4d28c7f"],(function(e,t,n,o,a,r,i,s,l,c,y,p,d,u,m,g,b,C,h,x,f,P,A,L,w,G,F){"use strict";const v=new o.Cartesian3,E=new t.BoundingRectangle,_=new o.Cartesian2,T=new o.Cartesian2,k=new o.Cartesian3,D=new o.Cartesian3,V=new o.Cartesian3,R=new o.Cartesian3,H=new o.Cartesian3,I=new o.Cartesian3,M=new n.Quaternion,B=new o.Matrix3,O=new o.Matrix3,z=new o.Cartesian3;function S(e,t,r,c,y,d,m,g,b){const C=e.positions;let h=u.PolygonPipeline.triangulate(e.positions2D,e.holes);h.length<3&&(h=[0,1,2]);const x=p.IndexDatatype.createTypedArray(C.length,h.length);x.set(h);let f=B;if(0!==c){let e=n.Quaternion.fromAxisAngle(m,c,M);if(f=o.Matrix3.fromQuaternion(e,f),t.tangent||t.bitangent){e=n.Quaternion.fromAxisAngle(m,-c,M);const a=o.Matrix3.fromQuaternion(e,O);g=o.Cartesian3.normalize(o.Matrix3.multiplyByVector(a,g,g),g),t.bitangent&&(b=o.Cartesian3.normalize(o.Cartesian3.cross(m,g,b),b))}}else f=o.Matrix3.clone(o.Matrix3.IDENTITY,f);const P=T;t.st&&(P.x=r.x,P.y=r.y);const A=C.length,L=3*A,w=new Float64Array(L),G=t.normal?new Float32Array(L):void 0,F=t.tangent?new Float32Array(L):void 0,E=t.bitangent?new Float32Array(L):void 0,k=t.st?new Float32Array(2*A):void 0;let D=0,V=0,R=0,H=0,I=0;for(let e=0;e<A;e++){const n=C[e];if(w[D++]=n.x,w[D++]=n.y,w[D++]=n.z,t.st)if(i.defined(y)&&y.positions.length===A)k[I++]=y.positions[e].x,k[I++]=y.positions[e].y;else{const e=d(o.Matrix3.multiplyByVector(f,n,v),_);o.Cartesian2.subtract(e,P,e);const t=a.CesiumMath.clamp(e.x/r.width,0,1),i=a.CesiumMath.clamp(e.y/r.height,0,1);k[I++]=t,k[I++]=i}t.normal&&(G[V++]=m.x,G[V++]=m.y,G[V++]=m.z),t.tangent&&(F[H++]=g.x,F[H++]=g.y,F[H++]=g.z),t.bitangent&&(E[R++]=b.x,E[R++]=b.y,E[R++]=b.z)}const z=new l.GeometryAttributes;return t.position&&(z.position=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:w})),t.normal&&(z.normal=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:G})),t.tangent&&(z.tangent=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:F})),t.bitangent&&(z.bitangent=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:E})),t.st&&(z.st=new s.GeometryAttribute({componentDatatype:a.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:k})),new s.Geometry({attributes:z,indices:x,primitiveType:s.PrimitiveType.TRIANGLES})}function N(e){const t=(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).polygonHierarchy,n=e.textureCoordinates,a=i.defaultValue(e.vertexFormat,m.VertexFormat.DEFAULT);this._vertexFormat=m.VertexFormat.clone(a),this._polygonHierarchy=t,this._stRotation=i.defaultValue(e.stRotation,0),this._ellipsoid=o.Ellipsoid.clone(i.defaultValue(e.ellipsoid,o.Ellipsoid.WGS84)),this._workerName="createCoplanarPolygonGeometry",this._textureCoordinates=n,this.packedLength=d.PolygonGeometryLibrary.computeHierarchyPackedLength(t,o.Cartesian3)+m.VertexFormat.packedLength+o.Ellipsoid.packedLength+(i.defined(n)?d.PolygonGeometryLibrary.computeHierarchyPackedLength(n,o.Cartesian2):1)+2}N.fromPositions=function(e){return new N({polygonHierarchy:{positions:(e=i.defaultValue(e,i.defaultValue.EMPTY_OBJECT)).positions},vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid,textureCoordinates:e.textureCoordinates})},N.pack=function(e,t,n){return n=i.defaultValue(n,0),n=d.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,n,o.Cartesian3),o.Ellipsoid.pack(e._ellipsoid,t,n),n+=o.Ellipsoid.packedLength,m.VertexFormat.pack(e._vertexFormat,t,n),n+=m.VertexFormat.packedLength,t[n++]=e._stRotation,i.defined(e._textureCoordinates)?n=d.PolygonGeometryLibrary.packPolygonHierarchy(e._textureCoordinates,t,n,o.Cartesian2):t[n++]=-1,t[n++]=e.packedLength,t};const Q=o.Ellipsoid.clone(o.Ellipsoid.UNIT_SPHERE),j=new m.VertexFormat,U={polygonHierarchy:{}};return N.unpack=function(e,t,n){t=i.defaultValue(t,0);const a=d.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,o.Cartesian3);t=a.startingIndex,delete a.startingIndex;const r=o.Ellipsoid.unpack(e,t,Q);t+=o.Ellipsoid.packedLength;const s=m.VertexFormat.unpack(e,t,j);t+=m.VertexFormat.packedLength;const l=e[t++],c=-1===e[t]?void 0:d.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t,o.Cartesian2);i.defined(c)?(t=c.startingIndex,delete c.startingIndex):t++;const y=e[t++];return i.defined(n)||(n=new N(U)),n._polygonHierarchy=a,n._ellipsoid=o.Ellipsoid.clone(r,n._ellipsoid),n._vertexFormat=m.VertexFormat.clone(s,n._vertexFormat),n._stRotation=l,n._textureCoordinates=c,n.packedLength=y,n},N.createGeometry=function(t){const l=t._vertexFormat,u=t._polygonHierarchy,m=t._stRotation,g=t._textureCoordinates,b=i.defined(g);let C=u.positions;if(C=e.arrayRemoveDuplicates(C,o.Cartesian3.equalsEpsilon,!0),C.length<3)return;let h=k,x=D,f=V,P=H;const A=I;if(!r.CoplanarPolygonGeometryLibrary.computeProjectTo2DArguments(C,R,P,A))return;if(h=o.Cartesian3.cross(P,A,h),h=o.Cartesian3.normalize(h,h),!o.Cartesian3.equalsEpsilon(R,o.Cartesian3.ZERO,a.CesiumMath.EPSILON6)){const e=t._ellipsoid.geodeticSurfaceNormal(R,z);o.Cartesian3.dot(h,e)<0&&(h=o.Cartesian3.negate(h,h),P=o.Cartesian3.negate(P,P))}const L=r.CoplanarPolygonGeometryLibrary.createProjectPointsTo2DFunction(R,P,A),w=r.CoplanarPolygonGeometryLibrary.createProjectPointTo2DFunction(R,P,A);l.tangent&&(x=o.Cartesian3.clone(P,x)),l.bitangent&&(f=o.Cartesian3.clone(A,f));const G=d.PolygonGeometryLibrary.polygonsFromHierarchy(u,b,L,!1),F=G.hierarchy,v=G.polygons,_=b?d.PolygonGeometryLibrary.polygonsFromHierarchy(g,!0,(function(e){return e}),!1).polygons:void 0;if(0===F.length)return;C=F[0].outerRing;const T=n.BoundingSphere.fromPoints(C),M=d.PolygonGeometryLibrary.computeBoundingRectangle(h,w,C,m,E),B=[];for(let e=0;e<v.length;e++){const t=new c.GeometryInstance({geometry:S(v[e],l,M,m,b?_[e]:void 0,w,h,x,f)});B.push(t)}const O=y.GeometryPipeline.combineInstances(B)[0];O.attributes.position.values=new Float64Array(O.attributes.position.values),O.indices=p.IndexDatatype.createTypedArray(O.attributes.position.values.length/3,O.indices);const N=O.attributes;return l.position||delete N.position,new s.Geometry({attributes:N,indices:O.indices,primitiveType:O.primitiveType,boundingSphere:T})},function(e,t){return i.defined(t)&&(e=N.unpack(e,t)),N.createGeometry(e)}}));
