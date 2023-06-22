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
define(["./Matrix2-474e79ca","./defaultValue-9e6a554b","./EllipseGeometry-a7e3f42a","./ComponentDatatype-bd805364","./WebGLConstants-f98c7b4b","./RuntimeError-671c2607","./Transforms-dd65ca14","./combine-e8ef3dac","./EllipseGeometryLibrary-c6b11b5f","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./GeometryInstance-f2f89e81","./GeometryOffsetAttribute-2ef72ea5","./GeometryPipeline-cb21a69b","./AttributeCompression-d23e49ed","./EncodedCartesian3-56641829","./IndexDatatype-83664323","./IntersectionTests-5d845af1","./Plane-6d3de2d4","./VertexFormat-32d2e9ac"],(function(e,t,r,a,n,i,o,s,c,d,l,f,m,b,p,u,y,G,E,C){"use strict";return function(a,n){return t.defined(n)&&(a=r.EllipseGeometry.unpack(a,n)),a._center=e.Cartesian3.clone(a._center),a._ellipsoid=e.Ellipsoid.clone(a._ellipsoid),r.EllipseGeometry.createGeometry(a)}}));
