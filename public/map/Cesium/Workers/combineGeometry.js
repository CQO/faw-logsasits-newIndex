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
define(["./PrimitivePipeline-a1beb208","./createTaskProcessorWorker","./Transforms-dd65ca14","./Matrix2-474e79ca","./defaultValue-9e6a554b","./ComponentDatatype-bd805364","./WebGLConstants-f98c7b4b","./RuntimeError-671c2607","./combine-e8ef3dac","./GeometryAttribute-11fd0efc","./GeometryAttributes-aa146789","./GeometryPipeline-cb21a69b","./AttributeCompression-d23e49ed","./EncodedCartesian3-56641829","./IndexDatatype-83664323","./IntersectionTests-5d845af1","./Plane-6d3de2d4","./WebMercatorProjection-c43c4879"],(function(e,t,i,r,n,a,o,c,s,m,b,d,u,P,p,f,l,y){"use strict";return t((function(t,i){const r=e.PrimitivePipeline.unpackCombineGeometryParameters(t),n=e.PrimitivePipeline.combineGeometry(r);return e.PrimitivePipeline.packCombineGeometryResults(n,i)}))}));
