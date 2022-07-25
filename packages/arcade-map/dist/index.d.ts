import * as THREE$1 from 'three';
import { Vector3, Matrix4, Plane, Frustum, Ray, Object3D, PerspectiveCamera } from 'three';

declare const ArcadeMap: () => JSX.Element;

/**
 * A class representing RGBA colors.
 *
 * @hidden
 * @internal
 */
declare class RGBA {
    r: number;
    g: number;
    b: number;
    a: number;
    /**
     * Parses a string describing a color.
     *
     * @param text - The string color literal
     */
    static parse(text: string): RGBA | undefined;
    /**
     * Constructs a [[RGBA]] color using the given components in the [0..1] range.
     */
    constructor(r?: number, g?: number, b?: number, a?: number);
    /**
     * Clones this [[RGBA]] color.
     */
    clone(): RGBA;
    /**
     * Returns this color encoded as one single number.
     */
    getHex(): number;
    /**
     * Linearly interpolate the components of this color.
     */
    lerp(target: RGBA, t: number): this;
    /**
     * Returns this color encoded as JSON literal.
     */
    toJSON(): string;
}

/**
 * Represents an object that carry {@link GeoBox} extents like interface.
 */
interface GeoBoxExtentLike {
    /**
     * Latitude span in degrees.
     */
    readonly latitudeSpan: number;
    /**
     * Longitude span in degrees
     */
    readonly longitudeSpan: number;
}

/**
 * Represents an object with `GeoCoordinates` like interface.
 */
interface GeoCoordinatesLike {
    /** The latitude in degrees. */
    latitude: number;
    /** The longitude in degrees. */
    longitude: number;
    /** The optional altitude in meters. */
    altitude?: number;
}

/**
 * An [[Array]] following the order longitude, latitude, altitude.
 */
declare type GeoPointLike = [number, number, number?];

/**
 * Represents an object with `LatLng` like interface.
 */
interface LatLngLike {
    /** The latitude in degrees. */
    lat: number;
    /** The longitude in degrees. */
    lng: number;
}

/**
 * Represents an object in different geo coordinate formats
 */
declare type GeoCoordLike = GeoPointLike | GeoCoordinatesLike | LatLngLike;

/**
 * `GeoCoordinates` is used to represent geo positions.
 */
declare class GeoCoordinates implements GeoCoordinatesLike {
    latitude: number;
    longitude: number;
    altitude?: number | undefined;
    /**
     * Returns a `GeoCoordinates` from the given latitude, longitude, and optional altitude.
     *
     * @param latitude - Latitude in degrees.
     * @param longitude - Longitude in degrees.
     * @param altitude - Altitude in meters.
     */
    static fromDegrees(latitude: number, longitude: number, altitude?: number): GeoCoordinates;
    /**
     * Returns a `GeoCoordinates` from the given latitude, longitude, and optional altitude.
     *
     * @param latitude - Latitude in radians.
     * @param longitude - Longitude in radians.
     * @param altitude - Altitude in meters.
     */
    static fromRadians(latitude: number, longitude: number, altitude?: number): GeoCoordinates;
    /**
     * Creates a {@link GeoCoordinates} from a {@link LatLngLike} literal.
     * ```typescript
     * const center = { lat: 53.3, lng: 13.4 };
     * mapView.geoCenter = GeoCoordinates.fromLatLng(center);
     * ```
     * @param latLng - A {@link LatLngLike} object literal.
     */
    static fromLatLng(latLng: LatLngLike): GeoCoordinates;
    /**
     * Creates a {@link GeoCoordinates} from a [[GeoPointLike]] tuple.
     *
     * Example:
     * ```typescript
     * mapView.geoCenter = GeoCoordinates.fromGeoPoint([longitude, latitude]);
     *
     * let geoCoords: number[] = ...;
     *
     * if (isGeoPointLike(geoCoords)) {
     *     const p = GeoCoordinates.fromGeoPoint(geoCoords);
     * }
     * ```
     * @param geoPoint - An [[Array]] of at least two elements following the order
     * longitude, latitude, altitude.
     */
    static fromGeoPoint(geoPoint: GeoPointLike): GeoCoordinates;
    /**
     * Creates a {@link GeoCoordinates} from different types of geo coordinate objects.
     *
     * Example:
     * ```typescript
     * const fromGeoPointLike = GeoCoordinates.fromObject([longitude, latitude]);
     * const fromGeoCoordinateLike = GeoCoordinates.fromObject({ longitude, latitude });
     * const fromGeoCoordinate = GeoCoordinates.fromObject(new GeoCoordinates(latitude, longitude));
     * const fromLatLngLike = GeoCoordinates.fromObject({ lat: latitude , lng: longitude });
     * ```
     *
     * @param geoPoint - Either [[GeoPointLike]], {@link GeoCoordinatesLike}
     * or {@link LatLngLike} object literal.
     */
    static fromObject(geoPoint: GeoCoordLike): GeoCoordinates;
    /**
     * Returns a `GeoCoordinates` resulting from the linear interpolation of other two.
     * @param geoCoords0 - One of the `GeoCoordinates` used for interpolation.
     * @param geoCoords1 - The other `GeoCoordinates` used for interpolation.
     * @param factor - Interpolation factor. If `0` result will be equal to `geoCoords0`, if `1`
     * it'll be equal to `geoCoords1`.
     * @param wrap - If `true`, interpolation will be done across the antimeridian, otherwise it's
     * done across the Greenwich meridian. Supported only if longitude span is less than 360 deg.
     * @default false
     * @param normalize - If `true`, interpolation result will be normalized. @default false
     */
    static lerp(geoCoords0: GeoCoordinates, geoCoords1: GeoCoordinates, factor: number, wrap?: boolean, normalize?: boolean): GeoCoordinates;
    /**
     * Creates a `GeoCoordinates` from the given latitude, longitude, and optional altitude.
     *
     * @param latitude - Latitude in degrees.
     * @param longitude - Longitude in degrees.
     * @param altitude - Altitude in meters.
     */
    constructor(latitude: number, longitude: number, altitude?: number | undefined);
    /**
     * Returns the latitude in radians.
     */
    get latitudeInRadians(): number;
    /**
     * Returns the longitude in radians.
     */
    get longitudeInRadians(): number;
    /**
     * Returns the latitude in degrees.
     * @deprecated Use the [[latitude]] property instead.
     */
    get latitudeInDegrees(): number;
    /**
     * Returns the longitude in degrees.
     * @deprecated Use the [[longitude]] property instead.
     */
    get longitudeInDegrees(): number;
    /**
     * The latitude in the degrees.
     */
    get lat(): number;
    /**
     * The longitude in the degrees.
     */
    get lng(): number;
    /**
     * Returns `true` if this `GeoCoordinates` is valid; returns `false` otherwise.
     */
    isValid(): boolean;
    /**
     * Returns the normalized `GeoCoordinates`.
     */
    normalized(): GeoCoordinates;
    /**
     * Returns `true` if this `GeoCoordinates` is equal to the other.
     *
     * @param other - GeoCoordinatesLike to compare to.
     */
    equals(other: GeoCoordinatesLike): boolean;
    /**
     * Copy values from the other.
     *
     * @param other - GeoCoordinatesLike to copy all values from.
     */
    copy(other: GeoCoordinatesLike): GeoCoordinates;
    /**
     * Clones this `GeoCoordinates`.
     */
    clone(): GeoCoordinates;
    /**
     * Returns this {@link GeoCoordinates} as {@link LatLngLike} literal.
     */
    toLatLng(): LatLngLike;
    /**
     * Converts this {@link GeoCoordinates} to a [[GeoPointLike]].
     */
    toGeoPoint(): GeoPointLike;
    /**
     * Returns the minimum longitude span from this `GeoCoordinates` to another.
     *
     * @param other - The other GeoCoordinatesLike defining the longitude span.
     */
    minLongitudeSpanTo(other: GeoCoordinatesLike): number;
}

/**
 * `GeoBox` is used to represent a bounding box in geo coordinates.
 */
declare class GeoBox implements GeoBoxExtentLike {
    readonly southWest: GeoCoordinates;
    readonly northEast: GeoCoordinates;
    /**
     * Returns a `GeoBox` with the given geo coordinates.
     *
     * @param southWest - The south west position in geo coordinates.
     * @param northEast - The north east position in geo coordinates.
     */
    static fromCoordinates(southWest: GeoCoordinates, northEast: GeoCoordinates): GeoBox;
    /**
     * Returns a `GeoBox` with the given center and dimensions.
     *
     * @param center - The center position of geo box.
     * @param extent - Box latitude and logitude span
     */
    static fromCenterAndExtents(center: GeoCoordinates, extent: GeoBoxExtentLike): GeoBox;
    /**
     * Constructs a new `GeoBox` with the given geo coordinates.
     *
     * @param southWest - The south west position in geo coordinates.
     * @param northEast - The north east position in geo coordinates.
     */
    constructor(southWest: GeoCoordinates, northEast: GeoCoordinates);
    /**
     * Returns the minimum altitude or `undefined`.
     */
    get minAltitude(): number | undefined;
    /**
     * Returns the maximum altitude or `undefined`.
     */
    get maxAltitude(): number | undefined;
    /**
     * Returns the south latitude in degrees of this `GeoBox`.
     */
    get south(): number;
    /**
     * Returns the north altitude in degrees of this `GeoBox`.
     */
    get north(): number;
    /**
     * Returns the west longitude in degrees of this `GeoBox`.
     */
    get west(): number;
    /**
     * Returns the east longitude in degrees of this `GeoBox`.
     */
    get east(): number;
    /**
     * Returns the center of this `GeoBox`.
     */
    get center(): GeoCoordinates;
    /**
     * Returns the latitude span in radians.
     */
    get latitudeSpanInRadians(): number;
    /**
     * Returns the longitude span in radians.
     */
    get longitudeSpanInRadians(): number;
    /**
     * Returns the latitude span in degrees.
     */
    get latitudeSpan(): number;
    get altitudeSpan(): number | undefined;
    /**
     * Returns the longitude span in degrees.
     */
    get longitudeSpan(): number;
    /**
     * Returns the latitude span in degrees.
     * @deprecated Use [[latitudeSpan]] instead.
     */
    get latitudeSpanInDegrees(): number;
    /**
     * Returns the longitude span in degrees.
     * @deprecated Use [[longitudeSpan]] instead.
     */
    get longitudeSpanInDegrees(): number;
    /**
     * Returns `true` if the given geo coordinates are contained in this `GeoBox`.
     *
     * @param point - The geo coordinates.
     */
    contains(point: GeoCoordinates): boolean;
    /**
     * Clones this `GeoBox` instance.
     */
    clone(): GeoBox;
    /**
     * Update the bounding box by considering a given point.
     *
     * @param point - The point that may expand the bounding box.
     */
    growToContain(point: GeoCoordinatesLike): void;
    private containsHelper;
}

/**
 * Represents an object with `GeoPolygon` like interface.
 *
 * This is defined as an Array of GeoCoordinates sorted in ccw order.
 *
 * @beta, @internal
 */
interface GeoPolygonLike {
    /**
     * Array of ccw sorted GeoCoordLike
     */
    coordinates: GeoCoordLike[];
}

declare type MinThreeItemsArray<T> = [T, T, T, ...T[]];
declare type GeoPolygonCoordinates = MinThreeItemsArray<GeoCoordinatesLike | GeoCoordinates | GeoCoordLike>;
/**
 * A GeoPolygon in 2D Space (altitudes will be ignored).
 * Coordinates are expected in counter-clockwise order, for convex polygons a sorting is
 * available.
 * Clockwise ordered or selfintersecting Polygons might lead to no or unexpected results.
 *
 * @beta @internal
 */
declare class GeoPolygon implements GeoPolygonLike {
    private readonly m_coordinates;
    /**
     * Creates a GeoPolygon instance
     *
     * @param coordinates An array of GeoCoordinates acting as the Vertices of the Polygon.
     * @param needsSort  If `true` it will sort the coordinates in ccw order, this will only
     *  result correctly for convex polygons @default false
     * @param needsWrapping  If `true` it will wrap around coordinates crossing the antemeridian.
     * Only supported for polygons with sides that don't span more than 180 degrees longitude.
     * @default false
     */
    constructor(coordinates: GeoPolygonCoordinates, needsSort?: boolean, needsWrapping?: boolean);
    get coordinates(): MinThreeItemsArray<GeoCoordinatesLike>;
    /**
     * Gets a BoundingBox for the Polygon
     *
     * Might have unexpected results for twisted or concave Polygons
     */
    getGeoBoundingBox(): GeoBox;
    /**
     * Gets the Centroid for the Polygon
     *
     * Might be undefined or with unexpected results for twisted or concave Polygons.
     */
    getCentroid(): GeoCoordinates | undefined;
    private sortCCW;
    private wrapCoordinatesAround;
    private getPolyAverageCenter;
    private getArea;
    private getEastAndWest;
    private getNorthAndSouth;
}

/**
 * Interface representing a Vector3.
 */
interface Vector3Like {
    /**
     * The X position.
     */
    x: number;
    /**
     * The Y position.
     */
    y: number;
    /**
     * The Z position.
     */
    z: number;
}

/**
 * An interface representing bounding box in world coordinates.
 */
interface Box3Like {
    /**
     * The minimum position in world coordinates of this bounding box.
     */
    readonly min: Vector3Like;
    /**
     * The maximum position in world coordinates of this bounding box.
     */
    readonly max: Vector3Like;
}

/**
 * The interface {@link TransformLike} is used to represent transforms with
 * only translation and rotation.
 */
interface TransformLike {
    /**
     * The position of this transform.
     */
    readonly position: Vector3Like;
    /**
     * The x-axis of this transform.
     */
    readonly xAxis: Vector3Like;
    /**
     * The y-axis of this transform.
     */
    readonly yAxis: Vector3Like;
    /**
     * The z-axis of this transform.
     */
    readonly zAxis: Vector3Like;
}

/**
 * The interface {@link OrientedBox3Like} is used to represent oriented bounding box.
 */
interface OrientedBox3Like extends TransformLike {
    /**
     * The extents of this bounding box.
     */
    readonly extents: Vector3Like;
}

declare class OrientedBox3 implements OrientedBox3Like {
    /**
     * The position of the center of this `OrientedBox3`.
     */
    readonly position: Vector3;
    /**
     * The x-axis of this `OrientedBox3`.
     */
    readonly xAxis: Vector3;
    /**
     * The y-axis of this `OrientedBox3`.
     */
    readonly yAxis: Vector3;
    /**
     * The z-axis of this `OrientedBox3`.
     */
    readonly zAxis: Vector3;
    /**
     * The extents of this `OrientedBox3`.
     */
    readonly extents: Vector3;
    /**
     * Creates a new `OrientedBox3`.
     */
    constructor();
    /**
     * Creates a new `OrientedBox3` with the given position, orientation and extents.
     *
     * @param position - The position of the center of the `OrientedBox3`.
     * @param rotationMatrix - The rotation of the `OrientedBox3`.
     * @param extents - The extents of the `OrientedBox3`.
     */
    constructor(position: Vector3, rotationMatrix: Matrix4, extents: Vector3);
    /**
     * Create a copy of this [[OrientedBoundingBox]].
     */
    clone(): OrientedBox3;
    /**
     * Copies the values of `other` to this {@link OrientedBox3}.
     * @param other - The other {@link OrientedBox3} to copy.
     */
    copy(other: OrientedBox3): void;
    /**
     * Gets the center position of this {@link OrientedBox3}.
     *
     * @param center - The returned center position.
     */
    getCenter(center?: Vector3): Vector3;
    /**
     * Gets the size of this {@link OrientedBox3}.
     *
     * @param size - The returned size.
     */
    getSize(size?: Vector3): Vector3;
    /**
     * Gets the orientation matrix of this `OrientedBox3`.
     * @param matrix - The output orientation matrix.
     */
    getRotationMatrix(matrix?: Matrix4): Matrix4;
    /**
     * Checks intersection with the given `THREE.Frustum` or array of `THREE.Plane`s.
     *
     * @param frustumOrPlanes - Frustum or array of planes.
     */
    intersects(frustumOrPlanes: Plane[] | Frustum): boolean;
    /**
     * Checks intersection with the given ray.
     *
     * @param ray - The ray to test.
     * @returns distance from ray origin to intersection point if it exist, undefined otherwise.
     */
    intersectsRay(ray: Ray): number | undefined;
    /**
     * Returns true if this {@link OrientedBox3} contains the given point.
     *
     * @param point - A valid point.
     */
    contains(point: Vector3): boolean;
    /**
     * Returns the distance from this {@link OrientedBox3} and the given `point`.
     *
     * @param point - A point.
     */
    distanceToPoint(point: Vector3): number;
    /**
     * Returns the squared distance from this {@link OrientedBox3} and the given `point`.
     *
     * @param point - A point.
     */
    distanceToPointSquared(point: Vector3): number;
}

/**
 * Interface representing a Vector2.
 */
interface Vector2Like {
    /**
     * The X position.
     */
    x: number;
    /**
     * The Y position.
     */
    y: number;
}

/**
 * The type of projection.
 */
declare enum ProjectionType {
    /**
     * A type of [Projection] with zero curvature.
     */
    Planar = 0,
    /**
     * A spherical [Projection].
     */
    Spherical = 1
}
/**
 * `Projection` is used to convert positions from geo coordinates to world coordinates and vice
 * versa.
 */
declare abstract class Projection {
    readonly unitScale: number;
    /**
     * The type of this [Projection].
     */
    abstract get type(): ProjectionType;
    /**
     * Constructs the Projection
     *
     * @param unitScale - How to transform the projected coordinates to world units.
     */
    constructor(unitScale: number);
    /**
     * Returns the world extents in world coordinates.
     *
     * @param minElevation - The minimum elevation in meters.
     * @param maxElevation - The maximum elevation in meters.
     * @param result - The optional object that will be used to create the resulting bounding box.
     */
    abstract worldExtent<Bounds extends Box3Like>(minElevation: number, maxElevation: number, result?: Bounds): Bounds;
    /**
     * Projects a point from geo coordinates (latitude, longitude, altitude) to world coordinates
     * (x,y,z).
     *
     * Example:
     * ```typescript
     * const worldPos = new THREE.Vector3();
     * projection.projectPoint(geoPos, worldPos);
     * ```
     *
     * @param geoPoint - The position in geo coordinates.
     * @param result - The optional object used to store the resulting world position, result must
     * implement {@link Vector3Like}.
     */
    abstract projectPoint<WorldCoordinates extends Vector3Like>(geoPoint: GeoCoordinatesLike, result?: WorldCoordinates): WorldCoordinates;
    /**
     * Gets the {@link TransformLike} of the local tangent space at the given point.
     *
     * @param point - The geo / world coordinates.
     * @param result - The {@link TransformLike}.
     */
    localTangentSpace(point: GeoCoordinatesLike | Vector3Like, result: TransformLike): TransformLike;
    /**
     * Returns the geo coordinates (latitude, longitude, altitude) from the given world position
     * (x,y,z).
     *
     * Example:
     * ```typescript
     * const geoPos = projection.unprojectPoint(worldPos);
     * console.log(geoPos.latitude, geoPos.longitude, geoPos.altitude);
     * ```
     *
     * @param worldPoint - The position in world coordinates.
     */
    abstract unprojectPoint(worldPoint: Vector3Like): GeoCoordinates;
    /**
     * Returns the altitude at the given world position (x,y,z) in meters.
     *
     * @param worldPoint - The position in world coordinates.
     */
    abstract unprojectAltitude(worldPoint: Vector3Like): number;
    /**
     * Projects bounds in geo coordinates to a bounding box in world coordinates.
     *
     * Example:
     * ```typescript
     * const bounds = projection.projectBox(geoBox);
     * console.log(bounds.min, bounds.max);
     * ```
     *
     * @param geoBox - The bounding box in geo coordinates.
     */
    abstract projectBox(geoBox: GeoBox): Box3Like;
    /**
     * Projects bounds in geo coordinates to a bounding box in world coordinates.
     *
     * Example:
     * ```typescript
     * const bounds = projection.projectBox(geoBox, new THREE.Box3());
     * console.log(bounds.min, bounds.max);
     * ```
     *
     * @param geoBox - The bounding box in geo coordinates.
     * @param result - The resulting {@link OrientedBox3Like}.
     */
    abstract projectBox<WorldBoundingBox extends Box3Like | OrientedBox3Like>(geoBox: GeoBox, result: WorldBoundingBox): WorldBoundingBox;
    /**
     * Converts a bounding box in world coordinates to a bounding box in geo coordinates.
     *
     * Example:
     * ```typescript
     * const geoPos = projection.unprojectPoint(worldPos);
     * console.log(geoPos.latitude, geoPos.longitude, geoPos.altitude);
     * ```
     *
     * @param worldBox - The bounding box in world coordinates.
     */
    abstract unprojectBox(worldBox: Box3Like): GeoBox;
    /**
     * Returns the scaling factor that must be used to convert the units used by `worldPoint` to
     * meters.
     *
     * @param worldPoint - The position in world coordinates.
     */
    abstract getScaleFactor(worldPoint: Vector3Like): number;
    /**
     * Returns the surface normal at the given world position.
     *
     * @param worldPoint - The position in world coordinates.
     */
    abstract surfaceNormal(worldPoint: Vector3Like): Vector3Like;
    /**
     * Returns the surface normal at the given world position.
     *
     * @param worldPoint - The position in world coordinates.
     * @returns The resulting normal vector.
     */
    abstract surfaceNormal<Normal extends Vector3Like>(worldPoint: Vector3Like, result: Normal): Normal;
    /**
     * Returns the signed distance between the given coordinates and
     * the closest point on the surface.
     *
     * @param worldPoint - The position in world coordinates.
     */
    abstract groundDistance(worldPoint: Vector3Like): number;
    /**
     * Scales the given world coordinates to the surface.
     *
     * @param worldPoint - The position in world coordinates.
     */
    abstract scalePointToSurface(worldPoint: Vector3Like): Vector3Like;
    /**
     * Reproject a world position from the given source {@link Projection}.
     *
     * @param sourceProjection - The source projection.
     * @param worldPos - A valid world position for the given source projection.
     * @returns The world position reprojected using this {@link Projection}.
     */
    reprojectPoint(sourceProjection: Projection, worldPos: Vector3Like): Vector3Like;
    /**
     * Reproject a world position from the given source {@link Projection}.
     *
     * @param sourceProjection - The source projection.
     * @param worldPos - A valid position in the world space defined by the source projection.
     * @param result - The resulting position reprojected using this {@link Projection}.
     */
    reprojectPoint<WorldCoordinates extends Vector3Like>(sourceProjection: Projection, worldPos: Vector3Like, result: WorldCoordinates): WorldCoordinates;
}

/**
 * Interface representing a `SubdivisionScheme`.
 */
interface SubdivisionScheme {
    /**
     * Returns the number of columns for the given level.
     *
     * @param level - The level.
     */
    getSubdivisionX(level: number): number;
    /**
     * Returns the number of rows for the given level.
     *
     * @param level - The level.
     */
    getSubdivisionY(level: number): number;
    /**
     * Returns the width of the partitions at the given level.
     *
     * @param level - The level.
     */
    getLevelDimensionX(level: number): number;
    /**
     * Returns the height of the partitions at the given level.
     *
     * @param level - The level.
     */
    getLevelDimensionY(level: number): number;
}

/**
 * The `TileKey` instances are used to address a tile in a quadtree.
 *
 * A tile key is defined by a row, a column, and a level. The tree has a root at level 0, with one
 * single tile. On every level, each tile is divided into four children (therefore the name
 * quadtree).
 *
 * Within each [[level]], any particular tile is addressed with [[row]] and [[column]]. The number
 * of rows and columns in each level is 2 to the power of the level. This means: On level 0, only
 * one tile exists, [[columnsAtLevel]]() and [[rowsAtLevel]]() are both 1. On level 1, 4 tiles
 * exist, in 2 rows and 2 columns. On level 2 we have 16 tiles, in 4 rows and 4 columns. And so on.
 *
 * A tile key is usually created using [[fromRowColumnLevel]]() method.
 *
 * `TileKey` instances are immutable, all members return new instances of `TileKey` and do not
 * modify the original object.
 *
 * Utility functions like [[parent]](), [[changedLevelBy]](), and [[changedLevelTo]]() allow for
 * easy vertical navigation of the tree. The number of available rows and columns in the tile's
 * level is given with [[rowCount]]() and [[columnCount]]().
 *
 * Tile keys can be created from and converted into various alternative formats:
 *
 *  - [[toQuadKey]]() / [[fromQuadKey]]() - string representation 4-based
 *  - [[toHereTile]]() / [[fromHereTile]]() - string representation 10-based
 *  - [[mortonCode]]() / [[fromMortonCode]]() - number representation
 *
 * Note - as JavaScript's number type can hold 53 bits in its mantissa, only levels up to 26 can be
 * represented in the number representation returned by [[mortonCode]]().
 */
declare class TileKey {
    readonly row: number;
    readonly column: number;
    readonly level: number;
    /**
     * Creates a tile key.
     *
     * @param row - The requested row. Must be less than 2 to the power of level.
     * @param column - The requested column. Must be less than 2 to the power of level.
     * @param level - The requested level.
     */
    static fromRowColumnLevel(row: number, column: number, level: number): TileKey;
    /**
     * Creates a tile key from a quad string.
     *
     * The quad string can be created with [[toQuadKey]].
     *
     * @param quadkey - The quadkey to convert.
     * @returns A new instance of `TileKey`.
     */
    static fromQuadKey(quadkey: string): TileKey;
    /**
     * Creates a tile key from a numeric Morton code representation.
     *
     * You can convert a tile key into a numeric Morton code with [[mortonCode]].
     *
     * @param quadKey64 - The Morton code to be converted.
     * @returns A new instance of {@link TileKey}.
     */
    static fromMortonCode(quadKey64: number): TileKey;
    /**
     * Creates a tile key from a heretile code string.
     *
     * The string can be created with [[toHereTile]].
     *
     * @param quadkey64 - The string representation of the HERE tile key.
     * @returns A new instance of `TileKey`.
     */
    static fromHereTile(quadkey64: string): TileKey;
    /**
     * Returns the number of available columns at a given level.
     *
     * This is 2 to the power of the level.
     *
     * @param level - The level for which to return the number of columns.
     * @returns The available columns at the given level.
     */
    static columnsAtLevel(level: number): number;
    /**
     * Returns the number of available rows at a given level.
     *
     * This is 2 to the power of the level.
     *
     * @param level - The level for which to return the number of rows.
     * @returns The available rows at the given level.
     */
    static rowsAtLevel(level: number): number;
    /**
     * Returns the closest matching `TileKey` in a cartesian coordinate system.
     *
     * @param level - The level for the tile key.
     * @param coordX - The X coordinate.
     * @param coordY - The Y coordinate.
     * @param totalWidth - The maximum X coordinate.
     * @param totalHeight - The maximum Y coordinate.
     * @returns A new tile key at the given level that includes the given coordinates.
     */
    static atCoords(level: number, coordX: number, coordY: number, totalWidth: number, totalHeight: number): TileKey;
    /**
     * Computes the Morton code of the parent tile key of the given Morton code.
     *
     * Note: The parent key of the root key is the root key itself.
     *
     * @param mortonCode - A Morton code, for example, obtained from [[mortonCode]].
     * @returns The Morton code of the parent tile.
     */
    static parentMortonCode(mortonCode: number): number;
    private m_mortonCode?;
    private m_hereTile?;
    /**
     * Constructs a new immutable instance of a `TileKey`.
     *
     * For the better readability, {@link TileKey.fromRowColumnLevel} should be preferred.
     *
     * Note - row and column must not be greater than the maximum rows/columns for the given level.
     *
     * @param row - Represents the row in the quadtree.
     * @param column - Represents the column in the quadtree.
     * @param level - Represents the level in the quadtree.
     */
    constructor(row: number, column: number, level: number);
    /**
     * Returns a tile key representing the parent of the tile addressed by this tile key.
     *
     * Throws an exception is this tile is already the root.
     */
    parent(): TileKey;
    /**
     * Returns a new tile key at a level that differs from this tile's level by delta.
     *
     * Equivalent to `changedLevelTo(level() + delta)`.
     *
     * Note - root key is returned if `delta` is smaller than the level of this tile key.
     *
     * @param delta - The numeric difference between the current level and the requested level.
     */
    changedLevelBy(delta: number): TileKey;
    /**
     * Returns a new tile key at the requested level.
     *
     * If the requested level is smaller than the tile's level, then the key of an ancestor of this
     * tile is returned. If the requested level is larger than the tile's level, then the key of
     * first child or grandchild of this tile is returned, for example, the child with the lowest
     * row and column number. If the requested level equals this tile's level, then the tile key
     * itself is returned. If the requested level is negative, the root tile key is returned.
     *
     * @param level - The requested level.
     */
    changedLevelTo(level: number): TileKey;
    /**
     * Converts the tile key to a numeric code representation.
     *
     * You can create a tile key from a numeric Morton code with [[fromMortonCode]].
     *
     * Note - only levels <= 26 are supported.
     */
    mortonCode(): number;
    /**
     * Converts the tile key into a string for using in REST API calls.
     *
     * The string is a quadkey Morton code representation as a string.
     *
     * You can convert back from a quadkey string with [[fromHereTile]].
     */
    toHereTile(): string;
    /**
     * Converts the tile key into a string for using in REST API calls.
     *
     * If the tile is the root tile, the quadkey is '-'. Otherwise the string is a number to the
     * base of 4, but without the leading 1, with the following properties:
     *  1. the number of digits equals the level.
     *  2. removing the last digit gives the parent tile's quadkey string, i.e. appending 0,1,2,3
     *     to a quadkey string gives the tiles's children.
     *
     * You can convert back from a quadkey string with [[fromQuadKey]].
     */
    toQuadKey(): string;
    /**
     * Equality operator.
     *
     * @param qnr - The tile key to compare to.
     * @returns `true` if this tile key has identical row, column and level, `false` otherwise.
     */
    equals(qnr: TileKey): boolean;
    /**
     * Returns the absolute quadkey that is constructed from its sub quadkey.
     *
     * @param sub - The sub key.
     * @returns The absolute tile key in the quadtree.
     */
    addedSubKey(sub: string): TileKey;
    /**
     * Returns the absolute quadkey that is constructed from its sub HERE tile key.
     *
     * @param sub - The sub HERE key.
     * @returns The absolute tile key in the quadtree.
     */
    addedSubHereTile(sub: string): TileKey;
    /**
     * Returns a sub quadkey that is relative to its parent.
     *
     * This function can be used to generate sub keys that are relative to a parent that is delta
     * levels up in the quadtree.
     *
     * This function can be used to create shortened keys for quads on lower levels if the parent is
     * known.
     *
     * Note - the sub quadkeys fit in a 16-bit unsigned integer if the `delta` is smaller than 8. If
     * `delta` is smaller than 16, the sub quadkey fits into an unsigned 32-bit integer.
     *
     * Deltas larger than 16 are not supported.
     *
     * @param delta - The number of levels relative to its parent quadkey. Must be greater or equal
     * to 0 and smaller than 16.
     * @returns The quadkey relative to its parent that is `delta` levels up the tree.
     */
    getSubHereTile(delta: number): string;
    /**
     * Returns the number of available rows in the tile's [[level]].
     *
     * This is 2 to the power of the level.
     */
    rowCount(): number;
    /**
     * Returns the number of available columns in the tile's [[level]].
     *
     * This is 2 to the power of the level.
     */
    columnCount(): number;
}

/**
 * `FlatTileBoundingBoxGenerator` generates bounding boxes in world and geo coordinates for a given
 * TilingScheme.
 */
declare class FlatTileBoundingBoxGenerator {
    readonly tilingScheme: TilingScheme;
    readonly minElevation: number;
    readonly maxElevation: number;
    private readonly m_tilingScheme;
    private readonly m_worldDimensions;
    private readonly m_worldBox;
    /**
     * Creates a new `FlatTileBoundingBoxGenerator` that can generate bounding boxes for the given
     * TilingScheme.
     *
     * @param tilingScheme - The {@link TilingScheme} used to compute bounding boxes.
     * @param minElevation - The minimum elevation in meters.
     * @param maxElevation - The maximum elevation in meters.
     */
    constructor(tilingScheme: TilingScheme, minElevation?: number, maxElevation?: number);
    /**
     * Returns the {@link Projection} of the {@link TilingScheme}.
     */
    get projection(): Projection;
    /**
     * Returns the {@link SubdivisionScheme} of the {@link TilingScheme}.
     */
    get subdivisionScheme(): SubdivisionScheme;
    /**
     * Returns the bounding box in world coordinates of the given {@link TileKey}.
     *
     * Example:
     * ```typescript
     * const worldBounds = new THREE.Box3();
     * generator.getWorldBox(geoBox, worldBounds);
     * console.log(worldBounds.getCenter());
     * ```
     *
     * @param tileKey - The TileKey.
     * @param result - The optional object used to store the resulting bounding box in world
     * coordinates.
     */
    getWorldBox(tileKey: TileKey, result?: Box3Like): Box3Like;
    /**
     * Returns the bounding box in geo coordinates for the given {@link TileKey}.
     *
     * Example:
     * ```typescript
     * const geoBox = generator.getGeoBox(worldBounds);
     * console.log(geoBox.center);
     * ```
     *
     * @param tileKey - The {@link TileKey}.
     */
    getGeoBox(tileKey: TileKey): GeoBox;
}

declare class TileTreeTraverse {
    private readonly m_subdivisionScheme;
    constructor(subdivisionScheme: SubdivisionScheme);
    subTiles(tileKey: TileKey): Iterable<TileKey>;
}

/**
 * The `TilingScheme` represents how the data is tiled.
 */
declare class TilingScheme {
    readonly subdivisionScheme: SubdivisionScheme;
    readonly projection: Projection;
    readonly boundingBoxGenerator: FlatTileBoundingBoxGenerator;
    readonly tileTreeTraverse: TileTreeTraverse;
    /**
     * Constructs a new `TilingScheme` with the given subdivision scheme and projection.
     *
     * @param subdivisionScheme - The subdivision scheme used by this `TilingScheme`.
     * @param projection - The projection used by this `TilingScheme`.
     */
    constructor(subdivisionScheme: SubdivisionScheme, projection: Projection);
    /**
     * Returns the sub tile keys of the given tile.
     *
     * @param tileKey - The {@link TileKey}.
     * @returns The list of the sub tile keys.
     */
    getSubTileKeys(tileKey: TileKey): Iterable<TileKey>;
    /**
     * Gets the {@link TileKey} from the given geo position and level.
     *
     * @param geoPoint - The position in geo coordinates.
     * @param level - The level of the resulting `TileKey`.
     */
    getTileKey(geoPoint: GeoCoordinatesLike, level: number): TileKey | null;
    /**
     * Gets the list of {@link TileKey}s contained in the given {@link GeoBox}.
     *
     * @param geoBox - The bounding box in geo coordinates.
     * @param level - The level of the resulting `TileKey`.
     */
    getTileKeys(geoBox: GeoBox, level: number): TileKey[];
    /**
     * Returns the bounding box in geo coordinates for the given {@link TileKey}.
     *
     * @param tileKey - The `TileKey`.
     */
    getGeoBox(tileKey: TileKey): GeoBox;
    /**
     * Returns the bounding box in world coordinates.
     *
     * @param tileKey - The `TileKey`.
     * @param result - The optional object that will contain the resulting bounding box.
     */
    getWorldBox(tileKey: TileKey, result?: Box3Like): Box3Like;
}

declare namespace TileKeyUtils {
    function geoCoordinatesToTileKey(tilingScheme: TilingScheme, geoPoint: GeoCoordinatesLike, level: number): TileKey | null;
    function worldCoordinatesToTileKey(tilingScheme: TilingScheme, worldPoint: Vector3Like, level: number): TileKey | null;
    function geoRectangleToTileKeys(tilingScheme: TilingScheme, geoBox: GeoBox, level: number): TileKey[];
    /**
     * Creates a unique key based on the supplied parameters. Note, the uniqueness is bounded by the
     * bitshift. The [[TileKey.mortonCode()]] supports currently up to 26 levels (this is because
     * 26*2 equals 52, and 2^52 is the highest bit that can be set in an integer in Javascript), the
     * bitshift reduces this accordingly, so given the default bitshift of four, we support up to 24
     * levels. Given the current support up to level 19 this should be fine.
     *
     * @param tileKey - The unique {@link @arcadecity/arcade-map/geoutils#TileKey}
     *                  from which to compute the unique key.
     * @param offset - How much the given {@link @arcadecity/arcade-map/geoutils#TileKey} is offset
     * @param bitshift - How much space we have to store the offset. The default of 4 means we have
     *      enough space to store 16 unique tiles in a single view.
     */
    function getKeyForTileKeyAndOffset(tileKey: TileKey, offset: number, bitshift?: number): number;
    /**
     * Extracts the offset and morton key from the given key (must be created by:
     * [[getKeyForTileKeyAndOffset]])
     *
     * Note, we can't use bitshift operators in Javascript because they work on 32-bit integers, and
     * would truncate the numbers, hence using powers of two.
     *
     * @param key - Key to extract offset and morton key.
     * @param bitshift - How many bits to shift by, must be the same as was used when creating the
     * key.
     */
    function extractOffsetAndMortonKeyFromKey(key: number, bitshift?: number): {
        offset: number;
        mortonCode: number;
    };
    /**
     * Returns the key of the parent. Key must have been computed using the function
     * [[getKeyForTileKeyAndOffset]].
     *
     * @param calculatedKey - Key to decompose
     * @param bitshift - Bit shift used to create the key
     */
    function getParentKeyFromKey(calculatedKey: number, bitshift?: number): number;
}

/**
 * The type representing the value of a property.
 */
declare type Value = null | boolean | number | string | object;
/**
 * An interface defining a collection of named properties.
 *
 * @example
 * ```typescript
 * const properties: ValueMap = {
 *    $id: 123,
 *    color: "rgba(255, 0, 0, 1)"
 * }
 * ```
 */
interface ValueMap {
    [name: string]: Value;
}
/**
 * A class used to lookup properties by name.
 *
 * @remarks
 * Concrete implementation of `Env` like {@link MapEnv} are used
 * to resolve the property names used in {@link Expr | style expressions}.
 *
 * @example
 * ```typescript
 * const env = new MapEnv({
 *     kind: "landuse",
 * });
 *
 * const expr = Expr.fromJson(["get", "kind"]);
 *
 * const value = expr.evaluate(env);
 *
 * console.log(`kind is '${value}`);
 * ```
 */
declare class Env {
    /**
     * Returns `true` if the given object is an instance of {@link Env}.
     *
     * @param object - The object to test.
     */
    static isEnv(object: any): object is Env;
    /**
     * Returns property in {@link Env} by name.
     *
     * @param name - Name of property.
     */
    lookup(name: string): Value | undefined;
    /**
     * Return an object containing all properties of this environment. (Here: empty object).
     */
    unmap(): ValueMap;
}
/**
 * `MapEnv` is a concrete implementation of {@link Env} that
 * creates a lookup environment from a set of properties.
 *
 * @example
 * ```typescript
 * const baseEnv = new MapEnv({
 *     $zoom: 14,
 * });
 *
 * // extends baseEnv with a the new binding (kind, "landuse").
 * const env = new MapEnv({ kind: "landuse" }, baseEnv);
 *
 * const zoom = env.lookup("$zoom"); // zoom is 14
 * const kind = env.lookup("kind"); // kind is is "landuse"
 *
 * const expr = Expr.fromJson(["get", "kind"]);
 * const value = expr.evaluate(env); // value is "landuse"
 * ```
 */
declare class MapEnv extends Env {
    readonly entries: ValueMap;
    private readonly parent?;
    constructor(entries: ValueMap, parent?: Env | undefined);
    /**
     * Returns property in {@link Env} by name.
     *
     * @param name - Name of property.
     * @override
     */
    lookup(name: string): Value | undefined;
    /**
     * Return an object containing all properties of this environment, takes care of the parent
     * object.
     * @override
     */
    unmap(): ValueMap;
}

interface OperatorDescriptor {
    /**
     * Returns `true` if this operator requires a dynamic execution context (e.g. ["zoom"]).
     */
    isDynamicOperator?: (call: CallExpr) => boolean;
    /**
     * Evaluates the given expression.
     */
    call: (context: ExprEvaluatorContext, call: CallExpr) => Value;
    /**
     * Partial evaluate the `call` expression using the given `context`.
     */
    partialEvaluate?: (context: ExprEvaluatorContext, call: CallExpr) => Value;
}
interface OperatorDescriptorMap {
    [name: string]: OperatorDescriptor;
}
declare class ExprEvaluatorContext {
    readonly evaluator: ExprEvaluator;
    readonly env: Env;
    readonly scope: ExprScope;
    readonly cache?: Map<Expr, Value> | undefined;
    constructor(evaluator: ExprEvaluator, env: Env, scope: ExprScope, cache?: Map<Expr, Value> | undefined);
    /**
     * Evaluate the given expression.
     *
     * @param expr - The {@link Expr} to evaluate.
     */
    evaluate(expr: Expr | undefined): Value;
    /**
     * Wraps the given value in an {@link Expr} if needed.
     *
     * @param value -
     */
    wrapValue(value: Value | Expr): Expr;
}
/**
 * [[ExprEvaluator]] is used to evaluate {@link Expr} in a given environment.
 *
 * @hidden
 */
declare class ExprEvaluator implements ExprVisitor<Value, ExprEvaluatorContext> {
    static defineOperator(op: string, builtin: OperatorDescriptor): void;
    static defineOperators(builtins: OperatorDescriptorMap): void;
    /**
     * Returns the [[OperatorDescriptor]] for the given operator name.
     * @hidden
     */
    static getOperator(op: string): OperatorDescriptor | undefined;
    visitVarExpr(expr: VarExpr, context: ExprEvaluatorContext): Value;
    visitNullLiteralExpr(expr: NullLiteralExpr, context: ExprEvaluatorContext): Value;
    visitBooleanLiteralExpr(expr: BooleanLiteralExpr, context: ExprEvaluatorContext): Value;
    visitNumberLiteralExpr(expr: NumberLiteralExpr, context: ExprEvaluatorContext): Value;
    visitStringLiteralExpr(expr: StringLiteralExpr, context: ExprEvaluatorContext): Value;
    visitObjectLiteralExpr(expr: ObjectLiteralExpr, context: ExprEvaluatorContext): Value;
    visitHasAttributeExpr(expr: HasAttributeExpr, context: ExprEvaluatorContext): Value;
    visitMatchExpr(match: MatchExpr, context: ExprEvaluatorContext): Value;
    visitCaseExpr(match: CaseExpr, context: ExprEvaluatorContext): Value;
    visitCallExpr(expr: CallExpr, context: ExprEvaluatorContext): Value;
    visitLookupExpr(expr: LookupExpr, context: ExprEvaluatorContext): Value;
    visitStepExpr(expr: StepExpr, context: ExprEvaluatorContext): Value;
    visitInterpolateExpr(expr: InterpolateExpr, context: ExprEvaluatorContext): Value;
}

interface InstantiationContext {
    /**
     * The {@link Env} used to lookup for names.
     */
    env: Env;
    /**
     * The names to preserve during the instantiation.
     */
    preserve?: Set<string>;
}

/**
 * [[ExprPool]] maintains a set of unique interned {@link Expr} objects.
 *
 * @hidden
 */
declare class ExprPool implements ExprVisitor<Expr, void> {
    private readonly m_booleanLiterals;
    private readonly m_numberLiterals;
    private readonly m_stringLiterals;
    private readonly m_objectLiterals;
    private readonly m_arrayLiterals;
    private readonly m_varExprs;
    private readonly m_hasAttributeExprs;
    private readonly m_matchExprs;
    private readonly m_caseExprs;
    private readonly m_interpolateExprs;
    private readonly m_stepExprs;
    private readonly m_callExprs;
    /**
     * Add `expr` to this [[ExprPool]] and return a unique {@link Expr}
     * object that is structurally equivalent to `expr`.
     *
     * @param expr - The {@link Expr} to add to this [[ExprPool]].
     * @returns A unique {@link Expr} that is structurally equivalent to `expr`.
     */
    add(expr: Expr): Expr;
    visitNullLiteralExpr(expr: NullLiteralExpr, context: void): Expr;
    visitBooleanLiteralExpr(expr: BooleanLiteralExpr, context: void): Expr;
    visitNumberLiteralExpr(expr: NumberLiteralExpr, context: void): Expr;
    visitStringLiteralExpr(expr: StringLiteralExpr, context: void): Expr;
    visitObjectLiteralExpr(expr: ObjectLiteralExpr, context: void): Expr;
    visitVarExpr(expr: VarExpr, context: void): Expr;
    visitHasAttributeExpr(expr: HasAttributeExpr, context: void): Expr;
    visitMatchExpr(expr: MatchExpr, context: void): Expr;
    visitCaseExpr(expr: CaseExpr, context: void): Expr;
    private visitCallExprImpl;
    visitCallExpr(expr: CallExpr, context: void): Expr;
    visitLookupExpr(expr: LookupExpr, context: void): Expr;
    visitStepExpr(expr: StepExpr, context: void): Expr;
    visitInterpolateExpr(expr: InterpolateExpr, context: void): Expr;
}

/**
 * A class representing Pixels.
 *
 * @hidden
 * @internal
 */
declare class Pixels {
    readonly value: number;
    /**
     * Parses a pixel string literal.
     *
     * @param text - The string color literal
     */
    static parse(text: string): Pixels | undefined;
    /**
     * Constructs a [[Pixels]] literal
     *
     * @param value - The number of pixels.
     */
    constructor(value: number);
    toJSON(): string;
}

/**
 * Interpolated property could have its value (some initial value should be provided) changed
 * according to an interpolation type.
 *
 * Here is an example of an interpolated property from a map style:
 * "lineWidth": {
 *  "interpolation": "Linear",
 *  "zoomLevels": [13, 14, 15],
 *  "values": [ 1.5, 1.2, 0.9]
 * }
 * @internal
 */
interface InterpolatedPropertyDefinition<T> {
    interpolation?: 'Discrete' | 'Linear' | 'Cubic' | 'Exponential';
    zoomLevels: number[];
    values: T[];
    exponent?: number;
}

/**
 * The style type of the line caps.
 */
declare type LineCaps = 'Square' | 'Round' | 'None' | 'TriangleOut' | 'TriangleIn';
/**
 * The style type of the line dashes.
 */
declare type LineDashes = 'Square' | 'Round' | 'Diamond';
/**
 * Defines how to interpret the units.
 */
declare type MetricUnit = 'Meter' | 'Pixel';
/**
 * Standard kinds of geometry.
 * @deprecated See {@link BaseTechniqueParams.kind}.
 */
declare enum StandardGeometryKind {
    /**
     * Used in the enabledKinds/disabledKinds filter to match any kind.
     */
    All = "_all_",
    /**
     * Background geometry.
     */
    Background = "background",
    /**
     * Terrain geometry.
     */
    Terrain = "terrain",
    /**
     * Default value for the FillTechnique.
     */
    Area = "area",
    /**
     * Default value for all line techniques.
     */
    Line = "line",
    /**
     * Default value for the FillTechnique.
     */
    Water = "water",
    /**
     * Political borders.
     */
    Border = "border",
    /**
     * Basis for all roads.
     */
    Road = "road",
    /**
     * Default value for the ExtrudedPolygonTechnique.
     */
    Building = "building",
    /**
     * Default value for the TextTechnique, LineMarkerTechnique and the PoiTechnique.
     */
    Label = "label",
    /**
     * Anything that may show up last.
     */
    Detail = "detail"
}
/**
 * The kind of geometry is used to group objects together,
 * allowing the group to be hidden or displayed.
 *
 * @remarks
 * Any string can be used to specify the kind of the technique in a style in the theme file. Is is
 * suggested to specify multiple kinds for specific types of data. For a highway, the following list
 * of kinds is suggested:
 *```json
 *    ["line", "road", "road:highway"]
 *```
 * If it is a tunnel for a highway:
 *```json
 *    ["line", "road", "road:highway", "tunnel", "road:tunnel", "road:highway:tunnel"]
 *```
 * If specified in this way, specific types of data (here: highway roads) can be enabled and/or
 * disabled.
 * @deprecated See {@link BaseTechniqueParams.kind}.
 */
declare type GeometryKind = string | StandardGeometryKind;
declare const GeometryKind: typeof StandardGeometryKind;
/**
 * Decorate property type with possible dynamic variants.
 */
declare type DynamicProperty<T> = T | JsonExpr | InterpolatedPropertyDefinition<T>;
/**
 * Length literals.
 *
 * @remarks
 * Description of length units inside a style. Supports literal values (interpreted as `m`), `m` and
 * `px`(i.e. `80`, `14px`, `0.6m`, etc.).
 */
declare type StyleLength = string | number;
/**
 * Color literals.
 *
 * @remarks
 * Description of colors inside a style. Supports hex values as well as CSS hex, rgb and hsl values
 * (i.e. `0xffffff`, `#f00fab`, `#aaa`, `rgb(255, 0 120)`, `hsl(360, 100%, 100%)`, etc.).
 */
declare type StyleColor = string | number;
/**
 * A set of {@link GeometryKind}s.
 */
declare class GeometryKindSet extends Set {
    /**
     * Return `true` if the Set is a superset of the set 'subset'.
     */
    isSuperset(subset: Set<any>): boolean;
    /**
     * Return `true` if the Set intersects Set 'set'.
     */
    hasIntersection(set: any): boolean;
    /**
     * Return `true` if the Set either intersects Set 'set' (if set is a Set), of has element 'set'
     * if set is not a Set.
     */
    hasOrIntersects(set: any): boolean;
    /**
     * Return `true` if this set and the array of elements share at least a single element.
     */
    hasOrIntersectsArray(subset: any[]): boolean;
}
/**
 * Common attributes or all [[Technique]]s.
 */
interface BaseTechniqueParams {
    /**
     * The name used to identify materials created from this technique.
     */
    id?: string;
    /**
     * The render order of the objects created using this technique.
     *
     * @remarks
     * If not specified in style file monotonically increasing
     * values according to style position in file.
     */
    renderOrder?: DynamicProperty<number>;
    /**
     * The category of this technique.
     *
     * @remarks
     * The category is used in conjunction with {@link Theme.priorities}
     * to assign render orders to the objects created by this {@link Style}.
     */
    category?: DynamicProperty<string>;
    /**
     * Optional. If `true` or `Pickability.transient`, no IDs will be saved for the geometry
     * this style creates. Default is `Pickability.onlyVisible`, which allows all pickable and
     * visible objects to be picked, Pickability.all, will also allow invisible objects to be
     * picked.
     * @defaultValue `Pickability.onlyVisible`
     * The boolean option is for backwardscompatibilty, please use the Pickability.
     *
     *
     * TODO: deprecate and rename to something that makes more sense
     */
    transient?: boolean | Pickability;
    /**
     * Distance to the camera `(0.0 = camera position, 1.0 = farPlane) at which the object start
     * fading out (opacity decreases).
     */
    fadeNear?: DynamicProperty<number>;
    /**
     * Distance to the camera (0.0 = camera position, 1.0 = farPlane) at which the object has zero
     * opacity and stops fading out. An undefined value disables fading.
     */
    fadeFar?: DynamicProperty<number>;
    /**
     * Specified kind of geometry.
     *
     * @remarks
     * One kind is set as default in the technique, and can be overridden in the style.
     *
     * @deprecated Use {@link enabled} with expressions based on `['dynamic-properties']` operator.
     * See "object picking" example.
     */
    kind?: GeometryKind | GeometryKindSet;
    /**
     * Runtime filtering of techniques.
     *
     * Use with `['dynamic-properties']` operator for dynamic feature highlight, highlighig etc.
     *
     * @see Picking example
     */
    enabled?: DynamicProperty<boolean>;
    /**
     * Set to 'true' if line should appear transparent.
     *
     * @remarks
     * Rendering transparent lines may come with a
     * slight performance impact.
     * See https://threejs.org/docs/#api/en/materials/Material.transparent.
     */
    transparent?: DynamicProperty<boolean>;
    /**
     * Defines which side of faces will be rendered - front, back or both.
     * See https://threejs.org/docs/#api/en/materials/Material.side.
     */
    side?: DynamicProperty<number>;
    /**
     * Minimal zoom level. If the current zoom level is smaller, the technique will not be used.
     */
    minZoomLevel?: DynamicProperty<number>;
    /**
     * Maximum zoom level. If the current zoom level is equal to or greater, the technique will not be used.
     */
    maxZoomLevel?: DynamicProperty<number>;
    /**
     * If `true`, geometry height won't be scaled on projection. Enable it for projections with
     * variable scale factor (e.g. mercator) to avoid distortions in geometry with great heights and
     * latitude spans. E.g. a large object with even height would look oblique to the ground plane
     * on mercator unless this property is set to `true`.
     *
     * @defaultValue `true` for geometries stored at level less than `12`.
     */
    constantHeight?: DynamicProperty<boolean>;
}
declare enum TextureCoordinateType {
    /**
     * Texture coordinates are in tile space.
     *
     * @remarks
     * SW of the tile will have (0,0) and NE will have (1,1).
     */
    TileSpace = "tile-space",
    /**
     * Texture coordinates are in equirectangular space.
     *
     * @remarks
     * (u, v) = ( (longitude+180) / 360, (latitude+90) / 180).
     */
    EquirectangularSpace = "equirectangular-space",
    /**
     * Texture coordinates in feature space.
     *
     * @remarks
     * To compute texture coordinates in feature space,
     * the feature must have a property named `bbox` with value
     * the tuple `[west, south, east, north]`.
     */
    FeatureSpace = "feature-space"
}
/**
 * Standard technique parameters.
 */
interface StandardTechniqueParams extends BaseTechniqueParams {
    /**
     * Color of the feature in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`,
     * `"#fff"`, `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.color.
     * @format color-hex
     */
    color?: DynamicProperty<StyleColor>;
    /**
     * A value of `true` creates a wireframe geometry. (May not be supported with all techniques).
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.wireframe.
     */
    wireframe?: boolean;
    /**
     * If `vertexColors` is `true`, every vertex has color information, which is interpolated
     * between vertices.
     * See https://threejs.org/docs/#api/en/materials/Material.vertexColors.
     */
    vertexColors?: boolean;
    /**
     * How rough the material appears. `0.0` means a smooth mirror reflection. `1.0` means fully
     * diffuse. Default is `1.0`.
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.roughness.
     */
    roughness?: DynamicProperty<number>;
    /**
     * How much the material is like a metal. Nonmetallic materials such as wood or stone use `0.0`,
     * metallic ones use `1.0`, with nothing (usually) in between. Default is `0.0`. A value between
     * `0.0` and `1.0` can be used for a rusty metal look. If `metalnessMap` is also provided, both
     * values are multiplied.
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.metalness.
     */
    metalness?: DynamicProperty<number>;
    /**
     * The material will not be rendered if the opacity is lower than this value.
     * See https://threejs.org/docs/#api/en/materials/Material.alphaTest.
     */
    alphaTest?: DynamicProperty<number>;
    /**
     * Skip rendering clobbered pixels.
     * See https://threejs.org/docs/#api/en/materials/Material.depthTest.
     */
    depthTest?: DynamicProperty<boolean>;
    /**
     * For transparent lines, set a value between 0.0 for totally transparent, to 1.0 for totally
     * opaque.
     * See https://threejs.org/docs/#api/en/materials/Material.opacity.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Emissive (light) color of the material, essentially a solid color unaffected by other
     * lighting. Default is black.
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.emissive.
     * @format color-hex
     */
    emissive?: DynamicProperty<StyleColor>;
    /**
     * Intensity of the emissive light. Modulates the emissive color. Default is `1`.
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.emissiveIntensity.
     */
    emissiveIntensity?: DynamicProperty<number>;
    /**
     * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of
     * the material. It is used with environment mapping modes `THREE.CubeRefractionMapping` and
     * `THREE.EquirectangularRefractionMapping`. The refraction ratio should not exceed `1`. Default
     *  is `0.98`.
     * See https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.refractionRatio.
     */
    refractionRatio?: DynamicProperty<number>;
    /**
     * Whether and how texture coordinates should be generated. No texture coordinates are
     * generated if `undefined`.
     * Should be set if any texture assigned (e.g. `map`, `normalMap`, ...).
     */
    textureCoordinateType?: TextureCoordinateType;
    map?: DynamicProperty<string | TextureBuffer>;
    mapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as normal map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.normalMap
     */
    normalMap?: DynamicProperty<string | TextureBuffer>;
    normalMapType?: DynamicProperty<number>;
    normalMapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as displacement map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.displacementMap
     */
    displacementMap?: DynamicProperty<string | TextureBuffer>;
    displacementMapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as roughness map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.roughnessMap
     */
    roughnessMap?: DynamicProperty<string | TextureBuffer>;
    roughnessMapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as emissive map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.emissiveMap
     */
    emissiveMap?: DynamicProperty<string | TextureBuffer>;
    emissiveMapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as bump map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.bumpMap
     */
    bumpMap?: DynamicProperty<string | TextureBuffer>;
    bumpMapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as metalness map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.metalnessMap
     */
    metalnessMap?: DynamicProperty<string | TextureBuffer>;
    metalnessMapProperties?: DynamicProperty<TextureProperties>;
    /**
     * URL or texture buffer that should be used as alpha map. See:
     * https://threejs.org/docs/#api/en/materials/MeshStandardMaterial.alphaMap
     */
    alphaMap?: DynamicProperty<string | TextureBuffer>;
    alphaMapProperties?: DynamicProperty<TextureProperties>;
}
/**
 * Possible parameters of [[PointTechnique]].
 */
interface PointTechniqueParams extends BaseTechniqueParams {
    /**
     * Color of a point in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    color?: DynamicProperty<StyleColor>;
    /**
     * URL of a texture image to be loaded.
     */
    texture?: string;
    /**
     * For transparent lines, set a value between 0.0 for totally transparent, to 1.0 for totally
     * opaque.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Size of point in pixels.
     */
    size?: DynamicProperty<number>;
    /**
     * Whether to enable picking on these points.
     */
    enablePicking?: boolean;
}
/**
 * Define the stacking option. Enum values for theme file are in "kebab-case".
 */
declare enum PoiStackMode {
    /**
     * Show in a stack.
     */
    Show = "show-in-stack",
    /**
     * Do not show in a stack.
     */
    Hide = "hide-in-stack",
    /**
     * Show category parent in the stack.
     */
    ShowParent = "show-parent"
}
/**
 * Define the pickability of an object.
 */
declare enum Pickability {
    /**
     * Pickable if visible.
     */
    onlyVisible = "only-visible",
    /**
     * Not Pickable at all.
     */
    transient = "transient",
    /**
     * All objects of this type pickable.
     */
    all = "all"
}
/**
 * Technique that describes icons with labels. Used in [[PoiTechnique]] and [[LineMarkerTechnique]]
 * (for road shields).
 */
interface MarkerTechniqueParams extends BaseTechniqueParams {
    /**
     * Text to be displayed for feature.
     *
     * @remarks
     * Defaults to first defined:
     *  - feature property `label` if present in technique (deprecated)
     *  - `["get", "name:short"]` is `useAbbreviation` is true
     *  - `["get", "iso_code"]` is `useIsoCode` is true
     *  - `["get", "name:$LANGUAGE"]` for each specified language
     *  - `["get", "name"]`
     *
     * See [[ExtendedTileInfo.getFeatureText]]
     */
    text?: DynamicProperty<string>;
    /**
     * Field name of object containing the text to be rendered.
     *
     * @deprecated Use `["get", "FIELD"]`.
     */
    label?: string;
    /**
     * If `true`, the abbreviation (field `name:short`) of the elements is used as text.
     *
     * @deprecated Use proper expression with [`get`, `name:short`] for this purpose.
     */
    useAbbreviation?: boolean;
    /**
     * If `true`, the iso code (field 'iso_code') of the elements is used as text.
     * The `iso_code` field contains the ISO 3166-1 2-letter country code.
     *
     * @deprecated Use proper expression with [`get`, `iso_code`] for this purpose.
     */
    useIsoCode?: boolean;
    /**
     * Priority of marker, defaults to `0`. Markers with highest priority get placed first.
     */
    priority?: DynamicProperty<number>;
    /**
     * Minimum zoomLevel at which to display the label text. No default.
     */
    textMinZoomLevel?: DynamicProperty<number>;
    /**
     * Maximum zoomLevel at which to display the label text. No default.
     */
    textMaxZoomLevel?: DynamicProperty<number>;
    /**
     * Minimum zoomLevel at which to display the label icon. No default.
     */
    iconMinZoomLevel?: DynamicProperty<number>;
    /**
     * Maximum zoomLevel at which to display the label icon. No default.
     */
    iconMaxZoomLevel?: DynamicProperty<number>;
    /**
     * Icon color.
     *
     * @remarks
     * If specified, combined using multiplication with color value read from icon texture.
     * Works best for grayscale or monochromatic textures.
     */
    iconColor?: StyleColor;
    /**
     * Icon brightness.
     *
     * @remarks
     * Factor that multiplies a color on top of the icon texture (and `iconColor`) with `0` being
     * fully black as final output, `1` being the original rgb colors of the texture.
     *
     * @defaultValue `1`
     */
    iconBrightness?: number;
    /**
     * Scaling factor of icon. Defaults to 0.5, reducing the size ot 50% in the distance.
     */
    distanceScale?: number;
    /**
     * If `false`, text may overlap markers.
     * @defaultValue `false`
     */
    textMayOverlap?: boolean;
    /**
     * If `false`, the icon may overlap text and other icons of lower priority.
     *
     * @remarks
     * If not defined, the
     * property value from `textMayOverlap` will be used.
     * @defaultValue `false`
     */
    iconMayOverlap?: boolean;
    /**
     * If `false`, text will not reserve screen space, other markers will be able to overlap.
     * @defaultValue `true`
     */
    textReserveSpace?: boolean;
    /**
     * If `false`, icon will not reserve screen space, other markers will be able to overlap.
     *
     * @remarks
     * If not defined, the property value from `iconReserveSpace` will be used.
     * @defaultValue `true`
     */
    iconReserveSpace?: boolean;
    /**
     * If `false`, text will not be rendered during animations. Defaults to `true`.
     */
    renderTextDuringMovements?: boolean;
    /**
     * If `true`, the label will always be rendered on top.
     *
     * @remarks
     * If overlapping with other labels with
     * this flag set, the render order is undefined.
     * @defaultValue `false`
     */
    alwaysOnTop?: boolean;
    /**
     * If `true`, icon will appear even if the text part is blocked by other labels.
     *
     * @remarks
     * @defaultValue `false`
     */
    textIsOptional?: boolean;
    /**
     * Should be displayed on map or not. Defaults to `true`.
     */
    showOnMap?: boolean;
    /**
     * Specify stack mode. Defaults to `ShowInStack`.
     */
    stackMode?: PoiStackMode;
    /**
     * Minimal distance between markers in screen pixels.
     */
    minDistance?: number;
    /**
     * If `true`, text will appear even if the icon is blocked by other labels.
     *
     * @defaultValue `false`
     */
    iconIsOptional?: boolean;
    /**
     * Fading time for labels in seconds.
     */
    textFadeTime?: number;
    /**
     * Fading time for icons in seconds.
     */
    iconFadeTime?: number;
    /**
     * Horizontal offset (to the right) in screen pixels.
     */
    xOffset?: DynamicProperty<number>;
    /**
     * Vertical offset (up) in screen pixels.
     */
    yOffset?: DynamicProperty<number>;
    /**
     * Horizontal offset (to the right) in screen pixels.
     */
    iconXOffset?: DynamicProperty<number>;
    /**
     * Vertical offset (up) in screen pixels.
     */
    iconYOffset?: DynamicProperty<number>;
    /**
     * Scaling factor of icon.
     */
    iconScale?: number;
    /**
     * Vertical height in pixels, controls vertical scaling. Overrides `iconScale`.
     */
    screenHeight?: DynamicProperty<number>;
    /**
     * Horizontal height in pixels, controls horizontal scaling. Overrides `iconScale`.
     */
    screenWidth?: DynamicProperty<number>;
    /**
     * Name of the POI table which should be used for this POI.
     */
    poiTable?: string;
    /**
     * Fixed name to identify POI options in the POI table.
     *
     * @remarks
     * If `poiName` has a value, this value
     * supersedes any value read from the field referenced in `poiNameField`.
     */
    poiName?: string;
    /**
     * Name of the field to evaluate to get the name of the POI options in the POI table.
     */
    poiNameField?: string;
    /**
     * The name of either the {@link ImageTexture} in {@link Theme.imageTextures} or the user image
     * cached in {@link @arcadecity/arcade-map/mapview#userImageCache} to be rendered as marker.
     */
    imageTexture?: DynamicProperty<string>;
    /**
     * Field name to extract imageTexture content from, if imageTexture refers to an
     * [[ImageTexture]] definition.
     */
    imageTextureField?: string;
    /**
     * Prefix for `imageTexture` if `imageTextureField` is used.
     */
    imageTexturePrefix?: string;
    /**
     * Postfix for `imageTexture` if `imageTextureField` is used.
     */
    imageTexturePostfix?: string;
    /**
     * Name of the text style.
     */
    style?: string;
    /**
     * Name of the preferred [[Font]] to be used when rendering.
     */
    fontName?: string;
    /**
     * Size of the text (pixels).
     */
    size?: DynamicProperty<number>;
    /**
     * Size of the text background (pixels).
     */
    backgroundSize?: DynamicProperty<number>;
    /**
     * Glyph style to apply for the currently active [[Font]].
     */
    fontStyle?: 'Regular' | 'Bold' | 'Italic' | 'BoldItalic';
    /**
     * Glyph variant to apply for the currently active [[Font]].
     */
    fontVariant?: 'Regular' | 'AllCaps' | 'SmallCaps';
    /**
     * Glyph local rotation (radians).
     */
    rotation?: number;
    /**
     * Text color in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    color?: DynamicProperty<StyleColor>;
    /**
     * Text background color in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`,
     * `"#fff"`, `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    backgroundColor?: DynamicProperty<StyleColor>;
    /**
     * For transparent text, set a value between 0.0 for totally transparent, to 1.0 for totally
     * opaque.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Background text opacity value.
     */
    backgroundOpacity?: DynamicProperty<number>;
    /**
     * Inter-glyph spacing (pixels). Scaled by `size`.
     */
    tracking?: DynamicProperty<number>;
    /**
     * Inter-line spacing (pixels). Scaled by `size`.
     */
    leading?: DynamicProperty<number>;
    /**
     * Maximum number of lines for this label.
     */
    maxLines?: DynamicProperty<number>;
    /**
     * Maximum line width (pixels).
     */
    lineWidth?: DynamicProperty<number>;
    /**
     * [[TextCanvas]] rotation (radians).
     */
    canvasRotation?: DynamicProperty<number>;
    /**
     * Line typesetting rotation (radians).
     */
    lineRotation?: DynamicProperty<number>;
    /**
     * Wrapping (line-breaking) mode.
     */
    wrappingMode?: DynamicProperty<'None' | 'Character' | 'Word'>;
    /**
     * Text position regarding the baseline.
     *
     * @note The [[placements]] attribute may override the alignment settings.
     */
    hAlignment?: DynamicProperty<'Left' | 'Center' | 'Right'>;
    /**
     * Text position inside a line.
     *
     * @note The [[placements]] attribute may supersede it.
     */
    vAlignment?: DynamicProperty<'Above' | 'Center' | 'Below'>;
    /**
     * Text label positions relative to the label central position (anchor point).
     *
     * @remarks
     * This attribute defines a comma separated tokens of possible text placements
     * relative to label central position (anchor), for example: "TL, TR, C".
     * Keep in mind that horizontal placement defines text position in opposite way to
     * the alignment, so the text `R` placed (located on the **right side** of label position)
     * will be the same as `Left` aligned by deduction. On other side vertical placement is quite
     * similar to vertical alignment so `T` placement corresponds with `Above` alignment.
     *
     * @note This attribute may override [[hAlignment]] and [[vAlignment]] if defined.
     */
    placements?: string;
    /**
     * World space offset in meters applied to the icon along the ground plane, i.e. tangent
     * to the local space up vector.
     *
     * @remarks
     * Valid only for icons which have the
     * "offset_direction" property as an attribute of the data, which specifies an angle in degrees
     * in which direction the offset should take place, i.e. 0 degrees is north, 90 is east etc.
     */
    worldOffset?: DynamicProperty<number>;
}
interface LineTechniqueParams extends BaseTechniqueParams {
    /**
     * Color of a line in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    color: DynamicProperty<StyleColor>;
    /**
     * For transparent lines, set a value between 0.0 for totally transparent, to 1.0 for totally
     * opaque.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Width of line in pixels. WebGL implementations will normally render all lines with 1 pixel
     * width, and ignore this value.
     */
    lineWidth: DynamicProperty<number>;
}
/**
 * Declares a geometry as a segment.
 */
interface SegmentsTechniqueParams extends BaseTechniqueParams {
    /**
     * Color of segments in a hexadecimal notation, for example: `"#e4e9ec"` or `"#fff"`.
     * @format color-hex
     */
    color: DynamicProperty<StyleColor>;
    /**
     * For transparent lines, set a value between `0.0` for fully transparent, to `1.0` for fully
     * opaque.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Width of a line in meters.
     */
    lineWidth: DynamicProperty<number>;
}
/**
 * Declares a a geometry as a polygon.
 */
interface PolygonalTechniqueParams {
    /**
     * Whether to use polygon offset. Default is false.
     *
     * @remarks
     * This corresponds to the
     * GL_POLYGON_OFFSET_FILL WebGL feature.
     *
     * PolygonOffset is used to raise the geometry towards the geometry (for depth calculation
     * only). Default is false.
     *
     * See here: https://sites.google.com/site/threejstuts/home/polygon_offset
     *
     * To activate polygonOffset these values have to be set to pull the line "forwards":
     *
     * transparent: true
     *
     * polygonOffset: true
     *
     * polygonOffsetFactor : -1.0, (as an example, see link above)
     *
     * polygonOffsetUnits: -1 (as an example, see link above)
     */
    polygonOffset?: boolean;
    /**
     * Sets the polygon offset factor. Default is 0.
     */
    polygonOffsetFactor?: DynamicProperty<number>;
    /**
     * Sets the polygon offset units. Default is 0.
     */
    polygonOffsetUnits?: DynamicProperty<number>;
    /**
     * Skip rendering clobbered pixels.
     * See https://threejs.org/docs/#api/en/materials/Material.depthTest.
     * @defaultValue `false`
     */
    depthTest?: DynamicProperty<boolean>;
    /**
     * Sets the polygon outline color.
     * @format color-hex
     */
    lineColor?: DynamicProperty<StyleColor>;
    /**
     * Distance to the camera (0.0 = nearPlane, 1.0 = farPlane) at which the object edges start
     * fading out.
     */
    lineFadeNear?: DynamicProperty<number>;
    /**
     * Distance to the camera (0.0 = nearPlane, 1.0 = farPlane) at which the object edges become
     * transparent. A value of <= 0.0 disables fading.
     */
    lineFadeFar?: DynamicProperty<number>;
    /**
     * Set to `true` if line should appear transparent. Rendering transparent lines may come with a
     * slight performance impact.
     */
    transparent?: DynamicProperty<boolean>;
    /**
     * For transparent lines, set a value between `0.0` for fully transparent, to `1.0` for fully
     * opaque.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Fill color in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    color?: DynamicProperty<StyleColor>;
}
/**
 * Declares a a geometry as a basic extruded line.
 */
interface BasicExtrudedLineTechniqueParams extends BaseTechniqueParams, PolygonalTechniqueParams {
    /**
     * A value determining the shading technique.
     *
     * @remarks
     * Valid values are "Basic" and "Standard". Default is "basic".
     *
     * `"basic"`   : Simple shading, faster to render. Only simple color and opacity are effective.
     * `"standard"`: Elaborate shading, with metalness, and roughness.
     */
    shading?: 'basic';
    /**
     * Width of line in meters for different zoom levels.
     */
    lineWidth: DynamicProperty<number>;
    /**
     * A value of `true` creates a wireframe geometry. (May not be supported with all techniques).
     */
    wireframe?: boolean;
    /**
     * Style of both end caps. Possible values: `"None"`, `"Circle"`. A value of undefined maps to
     * `"Circle"`.
     */
    caps?: DynamicProperty<'None' | 'Circle'>;
}
/**
 * Declares a a geometry as a standard extruded line.
 */
interface StandardExtrudedLineTechniqueParams extends StandardTechniqueParams, PolygonalTechniqueParams {
    /**
     * A value determining the shading technique. Valid values are `"basic"` and `"standard"`.
     * Default is `"basic"`.
     *
     * @remarks
     * `"basic"` : Simple shading, faster to render. Only simple color and opacity are effective.
     * `"standard"` : Elaborate shading, with metalness, and roughness.
     */
    shading: 'standard';
    /**
     * Width of a line in meters for different zoom levels.
     */
    lineWidth: DynamicProperty<number>;
    /**
     * Style of both end caps. Possible values: `"None"`, `"Circle"`.
     *
     * @remarks
     * A value of undefined maps to
     * `"Circle"`.
     */
    caps?: DynamicProperty<'None' | 'Circle'>;
}
/**
 * Declares a a geometry as a solid line.
 */
interface SolidLineTechniqueParams extends BaseTechniqueParams, PolygonalTechniqueParams {
    /**
     * Color of a line in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    color: DynamicProperty<StyleColor>;
    /**
     * Color of a line outline in hexadecimal or CSS-style notation,
     * for example: `"#e4e9ec"`, `"#fff"`, `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    outlineColor?: DynamicProperty<StyleColor>;
    /**
     * @deprecated Specify metrics units as part of the value instead.
     * Units in which different size properties are specified. Either `Meter` (default) or `Pixel`.
     */
    metricUnit?: MetricUnit;
    /**
     * Width of a line in `metricUnit` for different zoom levels.
     */
    lineWidth: DynamicProperty<StyleLength>;
    /**
     * Outline width of a line in `metricUnit`s for different zoom levels.
     */
    outlineWidth?: DynamicProperty<StyleLength>;
    /**
     * Clip the line outside the tile if `true`.
     * @defaultValue false
     */
    clipping?: DynamicProperty<boolean>;
    /**
     * Describes the style of the line caps.
     * @defaultValue `"Round"`.
     */
    caps?: DynamicProperty<LineCaps>;
    /**
     * Color of secondary line geometry in hexadecimal or CSS-style notation, for example:
     * `"#e4e9ec"`, `"#fff"`, `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    secondaryColor?: DynamicProperty<StyleColor>;
    /**
     * Width of secondary line geometry in `metricUnit`s for different zoom levels.
     */
    secondaryWidth?: DynamicProperty<StyleLength>;
    /**
     * The render order of the secondary line geometry object created using this technique.
     */
    secondaryRenderOrder?: DynamicProperty<number>;
    /**
     * Describes the style of the secondary line caps
     * @defaultValue `"Round"`.
     */
    secondaryCaps?: DynamicProperty<LineCaps>;
    /**
     * Describes the category of the secondary geometry object created using this technique.
     */
    secondaryCategory?: DynamicProperty<string>;
    /**
     * Describes the starting drawing position for the line (in the range [0...1]).
     * Default is `0.0`.
     */
    drawRangeStart?: number;
    /**
     * Describes the ending drawing position for the line (in the range [0...1]).
     * Default is `1.0`.
     */
    drawRangeEnd?: number;
    /**
     * Describes the style of the line dashes.
     * @defaultValue `"Square"`.
     */
    dashes?: DynamicProperty<LineDashes>;
    /**
     * Color of a line dashes in hexadecimal or CSS-style notation,
     * for example: `"#e4e9ec"`, `"#fff"`, `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    dashColor?: DynamicProperty<StyleColor>;
    /**
     * Length of a line in meters for different zoom levels.
     */
    dashSize?: DynamicProperty<StyleLength>;
    /**
     * Size of a gap between lines in meters for different zoom levels.
     */
    gapSize?: DynamicProperty<StyleLength>;
    /**
     * Size in world units how far to offset the line perpendicular to its direction.
     */
    offset?: DynamicProperty<number>;
}
/**
 * Technique used to draw filled polygons.
 */
interface FillTechniqueParams extends BaseTechniqueParams, PolygonalTechniqueParams {
    /**
     * A value of `true` creates a wireframe geometry. (May not be supported with all techniques).
     */
    wireframe?: boolean;
    /**
     * Width of the lines. Currently limited to the [0, 1] range.
     */
    lineWidth?: DynamicProperty<number>;
    map?: DynamicProperty<string | TextureBuffer>;
    mapProperties?: DynamicProperty<TextureProperties>;
    /**
     * Whether and how texture coordinates should be generated. No texture coordinates are
     * generated if `undefined`.
     * Should be set if a `map` is assigned.
     */
    textureCoordinateType?: TextureCoordinateType;
}
/**
 * Technique used to draw a geometry as an extruded polygon, for example extruded buildings.
 */
interface ExtrudedPolygonTechniqueParams extends StandardTechniqueParams {
    /**
     * Renders the footprint lines if set to 'true'.
     */
    footprint?: boolean;
    /**
     * Set to a negative value to remove all the vertical lines, and to a value between 0.0 and 1.0
     * to modulate the amount of vertical lines rendered.
     */
    maxSlope?: number;
    /**
     * Width of the lines. Currently limited to the [0, 1] range.
     */
    lineWidth: DynamicProperty<number>;
    /**
     * Fill color in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    lineColor?: DynamicProperty<StyleColor>;
    /**
     * Mix value between the lineColor(0.0) and the geometry's vertex colors(1.0).
     */
    lineColorMix?: number;
    /**
     * Distance to the camera (0.0 = nearPlane, 1.0 = farPlane) at which the object edges start
     * fading out.
     */
    lineFadeNear?: DynamicProperty<number>;
    /**
     * Distance to the camera (0.0 = nearPlane, 1.0 = farPlane) at which the object edges become
     * transparent. A value of <= 0.0 disables fading.
     */
    lineFadeFar?: DynamicProperty<number>;
    /**
     * Height above ground in world units of extruded polygon.
     *
     * Usually, unique per feature, so defaults to `["get", "height"]`.
     */
    height?: DynamicProperty<number>;
    /**
     * Height of "floor" of extruded polygon in world units of extruded polygon.
     *
     * Usually, unique per feature, so defaults to `["number", ["get", "min_height"], 0]`.
     */
    floorHeight?: DynamicProperty<number>;
    /**
     * In some data sources, for example Tilezen, building extrusion information might be missing.
     * This attribute allows to define a default height of an extruded polygon in the theme.
     *
     * @deprecated use [[height]]
     */
    defaultHeight?: number;
    /**
     * Default color used if feature doesn't provide color attribute
     * and [[MapEnv]] did not return it too.
     * @format color-hex
     */
    defaultColor?: DynamicProperty<StyleColor>;
    /**
     * If `true`, wall geometry will is added along the tile boundaries.
     *
     * @remarks
     * this causes artifacts when used with shadows,
     * so it should be known in advance that shadows won't be enabled.
     * @defaultValue `false`
     */
    boundaryWalls?: boolean;
    /**
     * Animate the extrusion of the buildings if set to `true`.
     */
    animateExtrusion?: DynamicProperty<boolean>;
    /**
     * Duration of the building's extrusion in milliseconds
     */
    animateExtrusionDuration?: number;
    /**
     * Control rendering of depth prepass before the actual geometry.
     *
     * @remarks
     * Depth prepass is a method to render translucent meshes, hence only the visible front faces of
     * a mesh are actually rendered, removing artifacts caused by blending with internal faces of
     * the mesh. This method is used for drawing translucent buildings over map background.
     *
     * By default, each [[DataSource]] determines how/if enable the depth pre-pass. A value of
     * `false` forcefully disables depth prepass.
     */
    enableDepthPrePass?: boolean;
}
interface ShaderTechniqueMaterialParameters {
    [name: string]: any;
}
/**
 * Special technique for user-defined shaders. See
 * https://threejs.org/docs/#api/harp-materials/ShaderMaterial for details.
 */
interface ShaderTechniqueParams extends BaseTechniqueParams {
    /**
     * Parameters for shader. See `THREE.ShaderMaterialParameters`.
     */
    params: ShaderTechniqueMaterialParameters;
    /**
     * Type of primitive for the shader technique.
     */
    primitive: 'point' | 'line' | 'segments' | 'mesh';
    [name: string]: any;
}
/**
 * Technique used to render a terrain geometry with a texture.
 *
 * @remarks
 * When using this technique, the datasource will produce texture coordinates in
 * local tile space (i.e. [0,0] at south-west and [1,1] at north-east tile corner).
 */
interface TerrainTechniqueParams extends StandardTechniqueParams {
    /**
     * Colors to be applied at different heights (as a results of a `displacementMap`).
     */
    heightBasedColors?: HeightBasedColors;
    /**
     * If `heightBasedColors` is defined, this value defines the interpolation method used to
     * generate the height-based gradient texture (defaults to `Discrete`).
     * @defaultValue `"Discrete"`
     */
    heightGradientInterpolation?: 'Discrete' | 'Linear' | 'Cubic';
    /**
     * If `heightBasedColors` is defined, this value defines the width (in pixels) of the generated
     * gradient texture.
     *
     * @defaultValue `128`
     */
    heightGradientWidth?: number;
}
/**
 * Render geometry as a text.
 */
interface TextTechniqueParams extends BaseTechniqueParams {
    /**
     * Text to be displayed for feature.
     *
     * @remarks
     * Defaults to first defined:
     *  - feature property `label` if present in technique (depreacted);
     *  - `["get", "name:short"]` is `useAbbreviation` is true;
     *  - `["get", "iso_code"]` is `useIsoCode` is true;
     *  - `["get", "name:$LANGUAGE"]` for each specified language;
     *  - `["get", "name"]`.
     */
    text?: DynamicProperty<string>;
    /**
     * Field name of object containing the text to be rendered.
     *
     * @deprecated Use `["get", "FIELD"]`.
     */
    label?: string;
    /**
     * If `true`, the abbreviation (field `name:short`) of the elements is used as text.
     *
     * @deprecated Use proper expression with [`get`, `name:short`] for this purpose.
     */
    useAbbreviation?: boolean;
    /**
     * If `true`, the iso code (field 'iso_code') of the elements is used as text.
     * @remarks
     * The `iso_code` field contains the ISO 3166-1 2-letter country code.
     *
     * @deprecated Use proper expression with [`get`, `iso_code`] for this purpose.
     */
    useIsoCode?: boolean;
    /**
     * Priority of text, defaults to `0`. Elements with highest priority get placed first.
     */
    priority?: DynamicProperty<number>;
    /**
     * Scaling factor of the text. Defaults to 0.5, reducing the size ot 50% in the distance.
     */
    distanceScale?: number;
    /**
     * If `true`, icon is allowed to overlap other labels or icons of lower priority.
     * @defaultValue `false`
     */
    mayOverlap?: boolean;
    /**
     * If `true`, element will reserve screen space, other markers of lower priority will not be
     * able to overlap.
     * @defaultValue `true`
     */
    reserveSpace?: boolean;
    /**
     * Fading time for labels in seconds.
     */
    textFadeTime?: number;
    /**
     * Horizontal offset (to the right) in screen pixels.
     */
    xOffset?: number;
    /**
     * Vertical offset (up) in screen pixels.
     */
    yOffset?: number;
    /**
     * Name of the text style.
     */
    style?: string;
    /**
     * Name of the preferred [[Font]] to be used when rendering.
     */
    fontName?: string;
    /**
     * Size of the text (pixels).
     */
    size?: DynamicProperty<number>;
    /**
     * Size of the text background (pixels).
     */
    backgroundSize?: DynamicProperty<number>;
    /**
     * Glyph style to apply for the currently active [[Font]].
     */
    fontStyle?: 'Regular' | 'Bold' | 'Italic' | 'BoldItalic';
    /**
     * Glyph variant to apply for the currently active [[Font]].
     */
    fontVariant?: 'Regular' | 'AllCaps' | 'SmallCaps';
    /**
     * Glyph local rotation (radians).
     */
    rotation?: number;
    /**
     * Text color in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`, `"#fff"`,
     * `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    color?: DynamicProperty<StyleColor>;
    /**
     * Text background color in hexadecimal or CSS-style notation, for example: `"#e4e9ec"`,
     * `"#fff"`, `"rgb(255, 0, 0)"`, or `"hsl(35, 11%, 88%)"`.
     * @format color-hex
     */
    backgroundColor?: DynamicProperty<StyleColor>;
    /**
     * For transparent text, set a value between 0.0 for totally transparent, to 1.0 for totally
     * opaque.
     */
    opacity?: DynamicProperty<number>;
    /**
     * Background text opacity value.
     */
    backgroundOpacity?: DynamicProperty<number>;
    /**
     * Inter-glyph spacing (pixels). Scaled by `size`.
     */
    tracking?: DynamicProperty<number>;
    /**
     * Inter-line spacing (pixels). Scaled by `size`.
     */
    leading?: DynamicProperty<number>;
    /**
     * Maximum number of lines for this label.
     */
    maxLines?: DynamicProperty<number>;
    /**
     * Maximum line width (pixels).
     */
    lineWidth?: DynamicProperty<number>;
    /**
     * [[TextCanvas]] rotation (radians).
     */
    canvasRotation?: DynamicProperty<number>;
    /**
     * Line typesetting rotation (radians).
     */
    lineRotation?: DynamicProperty<number>;
    /**
     * Wrapping (line-breaking) mode.
     */
    wrappingMode?: DynamicProperty<'None' | 'Character' | 'Word'>;
    /**
     * Text position regarding the baseline.
     */
    hAlignment?: DynamicProperty<'Left' | 'Center' | 'Right'>;
    /**
     * Text position inside a line.
     */
    vAlignment?: DynamicProperty<'Above' | 'Center' | 'Below'>;
}
/**
 * Buffer holding a texture.
 */
interface TextureBuffer {
    /**
     * Buffer containing the (compressed) image or the raw texture data.
     */
    buffer: ArrayBuffer;
    /**
     * Mime type of the image or 'image/raw' in case of raw texture data.
     */
    type: string;
    /**
     * Properties for creating a three.js DataTexture
     * (https://threejs.org/docs/#api/en/textures/DataTexture).
     */
    dataTextureProperties?: DataTextureProperties;
}
/**
 * Properties of a DataTexture (https://threejs.org/docs/#api/en/textures/DataTexture).
 */
interface DataTextureProperties {
    width: number;
    height: number;
    format?: PixelFormat;
    type?: TextureDataType;
}
/**
 * Properties of a Texture (https://threejs.org/docs/#api/en/textures/Texture).
 */
interface TextureProperties {
    /**
     * Texture horizontal wrapping mode.
     * See: https://threejs.org/docs/#api/en/textures/Texture.wrapS.
     */
    wrapS?: WrappingMode$1;
    /**
     * Texture vertical wrapping mode.
     * See: https://threejs.org/docs/#api/en/textures/Texture.wrapT.
     */
    wrapT?: WrappingMode$1;
    /**
     * Texture magnification filter.
     */
    magFilter?: MagFilter;
    /**
     * Texture minification filter.
     */
    minFilter?: MinFilter;
    /**
     * Flip texture vertically.
     * See: https://threejs.org/docs/#api/en/textures/Texture.flipY.
     */
    flipY?: boolean;
    /**
     * Texture horizontal repetition rate.
     * See: https://threejs.org/docs/#api/en/textures/Texture.repeat.
     */
    repeatU?: number;
    /**
     * Texture vertical repetition rate.
     * See: https://threejs.org/docs/#api/en/textures/Texture.repeat.
     */
    repeatV?: number;
}
/**
 * Interface containing the definition of different colors to be used at different heights with the
 * [[TerrainTechnique]].
 */
interface HeightBasedColors {
    heightArray: number[];
    colorArray: string[];
}
declare type PixelFormat = 'Alpha' | 'RGB' | 'RGBA' | 'Luminance' | 'LuminanceAlpha' | 'RGBE' | 'Depth' | 'DepthStencil' | 'Red';
declare type TextureDataType = 'UnsignedByte' | 'Byte' | 'Short' | 'UnsignedShort' | 'Int' | 'UnsignedInt' | 'Float' | 'HalfFloat';
/**
 * Available texture wrapping modes.
 */
declare type WrappingMode$1 = 'clamp' | 'repeat' | 'mirror';
/**
 * Available texture magnification filters.
 */
declare type MagFilter = 'nearest' | 'linear';
/**
 * Available texture minification filters.
 */
declare type MinFilter = 'nearest' | 'nearestMipMapNearest' | 'nearestMipMapLinear' | 'linear' | 'linearMipMapNearest' | 'linearMipMapLinear';

/**
 * Map theme is used to define what features are shown and how the map is styled, for example
 * which lightning is used or whether fog should be displayed.
 */
interface Theme {
    /**
     * The URI of the JSON schema describing themes.
     */
    $schema?: string;
    /**
     * The base `Theme`s or `theme` URLs to extend.
     *
     * @remarks
     * If used, base themes are loaded first, and then all the properties from inherited theme
     * overwrite these defined in base theme.
     */
    extends?: string | Theme | Array<string | Theme>;
    /**
     * Actual URL the theme has been loaded from.
     */
    url?: string;
    /**
     * Color to be used as a clear background - no map objects.
     * @format color-hex
     */
    clearColor?: string;
    /**
     * Alpha to be used as a clear background - no map objects.
     * @format 0-1
     */
    clearAlpha?: number;
    /**
     * Define the default text style for styling labels and texts.
     */
    defaultTextStyle?: TextStyleDefinition;
    /**
     * Define the lightning available on the three.js scene.
     */
    lights?: Light[];
    /**
     * Define the style of the sky presented in the map scene.
     */
    sky?: Sky;
    /**
     * Define the fog used in the map scene.
     */
    fog?: Fog;
    /**
     * The definitions exported by these theme.
     */
    definitions?: Definitions;
    /**
     * Map styles available for datasources used to render the map.
     */
    styles?: StylesDictionary | Styles;
    /**
     * Define the style to render different types of text used on the map.
     */
    textStyles?: TextStyleDefinition[];
    /**
     * List available fonts to be used while rendering text.
     */
    fontCatalogs?: FontCatalogConfig[];
    /**
     * Optional images to be rendered on the map view.
     */
    images?: ImageDefinitions;
    /**
     * Image textures to be used while rendering geometries on the map view.
     */
    imageTextures?: ImageTexture[];
    /**
     * Optional list of [[ThemePoiTableDef]]s.
     */
    poiTables?: PoiTableRef[];
    /**
     * Optional list of symbolic priorities for the object
     * created using this {@link Theme}.
     *
     * @remarks
     * The attribute `styleSet` and `category` of the [[Technique]]
     * are used together with [[Theme.priorities]] to sort
     * the objects created using this {@link Theme}, for example:
     *
     *
     * ```json
     * {
     *      "priorities": [
     *          { "group": "tilezen", "category": "outline-1" }
     *      ],
     *      "styles": [
     *          {
     *              "technique": "solid-line",
     *              "styleSet": "tilezen",
     *              "category": "outline-1"
     *          }
     *      ]
     * }
     * ```
     */
    priorities?: StylePriority[];
    /**
     * Optional list of priorities for the screen-space
     * objects created using this style.
     *
     * @remarks
     * The name of the `category` attribute of the screen-space
     * technique (e.g. `"text"`) must match on the strings
     * defined by this [[Theme.labelPriorities]], for example:
     *
     * ```json
     * {
     *      "labelPriorities": [
     *          "continent-labels",
     *          "country-labels",
     *          "state-labels"
     *      ],
     *      "styles": [
     *          {
     *              "technique": "text",
     *              "category": "state-labels"
     *          }
     *      ]
     * }
     * ```
     */
    labelPriorities?: string[];
}
/**
 * A type representing symbolic render orders.
 */
interface StylePriority {
    /**
     * The group of this `StylePriority`.
     */
    group: string;
    /**
     * The category of this `StylePriority`.
     */
    category?: string;
}
/**
 * Value definition commons.
 */
declare type Definition = JsonValue | InterpolatedPropertyDefinition<JsonValue>;
/**
 * This is the old, more verbose, format of the definitions, to be deprecated
 * @deprecated
 */
interface VerboseDefinition {
    /**
     * The type of the definition.
     */
    type?: 'selector' | 'boolean' | 'number' | 'string' | 'color';
    /**
     * The value of the definition.
     */
    value: Definition;
    /**
     * The description of the definition.
     */
    description?: string;
}
interface Definitions {
    [name: string]: Definition | VerboseDefinition;
}
/**
 * An array of {@link Style}s that are used together to define how a
 * {@link @arcadecity/arcade-map/mapview#DataSource} should be rendered.
 *
 * @remarks
 * `StyleSet`s are applied to sources providing vector tiles via their method
 * `setStyleSet`. This is also handle internally when a whole theme is passed to a
 * {@link @arcadecity/arcade-map/mapview#MapView} via {@link @arcadecity/arcade-map/mapview#MapViewtheme}.
 */
declare type Styles = Style[];
/**
 * The object that defines what way an item of a {@link @arcadecity/arcade-map/mapview#DataSource}
 * should be decoded to assemble a tile.
 *
 * @remarks
 * {@link Style} is describing which features are shown on a map and in what way they are being
 * shown.
 */
declare type BaseStyle<Technique, Params> = StyleAttributes<Technique, Params> & Partial<Params>;
/**
 * The common attributes of a {@link Style}.
 */
interface StyleAttributes<Technique, Params> {
    /**
     * Unique identifier associated with this `Style`.
     */
    id?: string;
    /**
     * Reference to the identifier of an existing `Style` to extend.
     */
    extends?: string;
    /**
     * Condition when this style rule applies.
     *
     * @remarks
     * Condition that is applied to feature properties to check if given {@link Style} this feature
     * should emit geometry of this style.
     */
    when?: string | JsonExpr;
    /**
     * The layer containing the carto features processed by this style rule.
     */
    layer?: string;
    /**
     * Optional. If `true`, no more matching styles will be evaluated.
     */
    final?: boolean;
    /**
     * Human readable description.
     */
    description?: string;
    /**
     * The style set referenced by this styling rule.
     */
    styleSet?: string;
    /**
     * The category of this style.
     */
    category?: string | JsonExpr;
    /**
     * The name of the technique to use.
     *
     * @remarks
     * Technique name. See the classes extending from this class to determine what possible
     * techniques are possible, includes `"line"`, `"fill"`, `"solid-line"`, `"extruded-line"`,
     * `"extruded-polygon"`, `"text"`, `"none"`.
     */
    technique: Technique;
    /**
     * Specify `renderOrder` of value.
     *
     * @remarks
     * @default If not specified in style file, `renderOrder` will be assigned with monotonically
     * increasing values according to style position in file.
     */
    renderOrder?: number | JsonExpr;
    /**
     * Minimal zoom level. If the current zoom level is smaller, the technique will not be used.
     */
    minZoomLevel?: number | JsonExpr;
    /**
     * Maximum zoom level. If the current zoom level is larger, the technique will not be used.
     */
    maxZoomLevel?: number | JsonExpr;
    /**
     * Optional. If `true` or `Pickability.transient`, no IDs will be saved for the geometry
     * this style creates. Default is `Pickability.onlyVisible`, which allows all pickable and visible
     * objects to be picked, Pickability.all, will also allow invisible objects to be
     * picked.
     * @defaultValue `Pickability.onlyVisible`
     * The boolean option is for backwardscompatibilty, please use the Pickability.
     *
     *
     * TODO: deprecate and rename to something that makes more sense
     */
    transient?: boolean | Pickability;
    /**
     * Optional: If `true`, the objects with matching `when` statement will be printed to the
     * console.
     */
    debug?: boolean;
    /**
     * @deprecated Technique parameters are now properties at the Style interface level.
     */
    attr?: Partial<Params>;
}
declare type Style = SquaresStyle | CirclesStyle | PoiStyle | LineMarkerStyle | LineStyle | SegmentsStyle | SolidLineStyle | LabelRejectionLineStyle | FillStyle | StandardStyle | BasicExtrudedLineStyle | StandardExtrudedLineStyle | ExtrudedPolygonStyle | ShaderStyle | TerrainStyle | TextTechniqueStyle | NoneStyle;
/**
 * A dictionary of {@link Styles}s.
 * @deprecated
 *
 * Use {@link Styles} instead, which is just a flat list of {@link Style}
 */
interface StylesDictionary {
    [styleSetName: string]: Styles;
}
/**
 * Render feature as set of squares rendered in screen space.
 *
 * @see {@link PointTechniqueParams}.
 */
declare type SquaresStyle = BaseStyle<'squares', PointTechniqueParams>;
/**
 * Render feature as set of circles rendered in screen space.
 *
 * @see {@link PointTechniqueParams}.
 */
declare type CirclesStyle = BaseStyle<'circles', PointTechniqueParams>;
/**
 * Render feature as POIs (icons and text) rendered in screen space.
 *
 * @see [[MarkerTechniqueParams]].
 */
declare type PoiStyle = BaseStyle<'labeled-icon', MarkerTechniqueParams>;
/**
 * Render feature as line markers, which is a recurring marker along a line (usually road).
 *
 * @see [[MarkerTechniqueParams]].
 */
declare type LineMarkerStyle = BaseStyle<'line-marker', MarkerTechniqueParams>;
/**
 * Render feature as line.
 */
declare type LineStyle = BaseStyle<'line', LineTechniqueParams>;
/**
 * Render feature as segments.
 */
declare type SegmentsStyle = BaseStyle<'segments', SegmentsTechniqueParams>;
declare type SolidLineStyle = BaseStyle<'solid-line' | 'dashed-line', SolidLineTechniqueParams>;
declare type LabelRejectionLineStyle = BaseStyle<'label-rejection-line', BaseTechniqueParams>;
declare type FillStyle = BaseStyle<'fill', FillTechniqueParams>;
declare type StandardStyle = BaseStyle<'standard', StandardTechniqueParams>;
declare type TerrainStyle = BaseStyle<'terrain', TerrainTechniqueParams>;
declare type BasicExtrudedLineStyle = BaseStyle<'extruded-line', BasicExtrudedLineTechniqueParams>;
declare type StandardExtrudedLineStyle = BaseStyle<'extruded-line', StandardExtrudedLineTechniqueParams>;
/**
 * Style used to draw a geometry as an extruded polygon, for example extruded buildings.
 */
declare type ExtrudedPolygonStyle = BaseStyle<'extruded-polygon', ExtrudedPolygonTechniqueParams>;
declare type ShaderStyle = BaseStyle<'shader', ShaderTechniqueParams>;
declare type TextTechniqueStyle = BaseStyle<'text', TextTechniqueParams>;
interface NoneStyle extends BaseStyle<'none', {
    [name: string]: any;
}> {
    [name: string]: any;
}
/**
 * Possible lights used for light the map.
 */
declare type Light = AmbientLight | DirectionalLight;
interface BaseLight {
    type: string;
    name: string;
}
/**
 * Ambient light
 */
interface AmbientLight extends BaseLight {
    /**
     * The type of the light.
     */
    type: 'ambient';
    /**
     * The color of this ambient light.
     */
    color: string;
    /**
     * The intensity of this ambient light.
     */
    intensity?: number;
}
/**
 * Directional light.
 */
interface DirectionalLight extends BaseLight {
    /**
     * The type of the light.
     */
    type: 'directional';
    /**
     * The color of this directional light.
     */
    color: string;
    /**
     * The intensity of this directional light.
     */
    intensity: number;
    /**
     * The direction of this directional light.
     */
    direction: Vector3Like;
    /**
     * Determine if this light casts dynamic shadows.
     *
     * @defaultValue false
     */
    castShadow?: boolean;
}
/**
 * Various text styles used with labels and texts.
 */
interface TextStyleDefinition {
    name?: string;
    fontCatalogName?: string;
    fontName?: string;
    size?: number;
    backgroundSize?: number;
    fontStyle?: 'Regular' | 'Bold' | 'Italic' | 'BoldItalic';
    fontVariant?: 'Regular' | 'AllCaps' | 'SmallCaps';
    rotation?: number;
    /**
     * @format color-hex
     */
    color?: string;
    /**
     * @format color-hex
     */
    backgroundColor?: string;
    opacity?: number;
    backgroundOpacity?: number;
    tracking?: number;
    leading?: number;
    maxLines?: number;
    lineWidth?: number;
    canvasRotation?: number;
    lineRotation?: number;
    wrappingMode?: 'None' | 'Character' | 'Word';
    hAlignment?: 'Left' | 'Center' | 'Right';
    vAlignment?: 'Above' | 'Center' | 'Below';
    /**
     * @format comma separated list of placement tokens, i.e. "TR, TL, C"
     * @see [[PlacementToken]]
     */
    placements?: string;
}
/**
 * Interface that defines a procedural gradient sky.
 */
interface GradientSky {
    /** Sky type. */
    type: 'gradient';
    /**
     * Color of the upper part of the gradient.
     * @format color-hex
     */
    topColor: string;
    /**
     * Color of bottom part of the gradient.
     * @format color-hex
     */
    bottomColor: string;
    /**
     * Color of the ground plane.
     * @format color-hex
     */
    groundColor: string;
    /** Texture's gradient power. */
    monomialPower?: number;
}
/**
 * Interface that defines a cubemap sky.
 */
interface CubemapSky {
    /** Sky type. */
    type: 'cubemap';
    /** Positive X cube map face. */
    positiveX: string;
    /** Negative X cube map face. */
    negativeX: string;
    /** Positive Y cube map face. */
    positiveY: string;
    /** Negative Y cube map face. */
    negativeY: string;
    /** Positive Z cube map face. */
    positiveZ: string;
    /** Negative Z cube map face. */
    negativeZ: string;
}
/**
 * Interface that defines the options to configure the sky.
 */
declare type Sky = GradientSky | CubemapSky;
/**
 * Interface that defines the options to configure fog.
 */
interface Fog {
    /** Fog's color. */
    color: string;
    /** Distance ratio to far plane at which the linear fog begins. */
    startRatio: number;
}
/**
 * Define an image (e.g. icon).
 */
interface ImageDefinition {
    /** Url to load content from. */
    url: string;
    /** `true` to start loading at init tile, `false` to lazily wait until required. */
    preload: boolean;
    /** Url of JSON file containing the texture atlas */
    atlas?: string;
}
interface ImageDefinitions {
    /** Name of Image. */
    [name: string]: ImageDefinition;
}
/**
 * Can be used to create a texture atlas.
 */
interface ImageTexture {
    /** Name of ImageTexture. Used to reference texture in the styles. */
    name: string;
    /** Name of ImageDefinition to use. */
    image: string;
    /** Origin of image, defaults to "topleft" */
    origin?: string;
    /** Specify sub-region: Defaults to 0. */
    xOffset?: number;
    /** Specify sub-region: Defaults to 0. */
    yOffset?: number;
    /** Specify sub-region:  Defaults to 0, meaning width is taken from loaded image. */
    width?: number;
    /** Specify sub-region:  Defaults to 0, meaning height is taken from loaded image. */
    height?: number;
    /** Defaults to false. */
    flipH?: boolean;
    /** Defaults to false. */
    flipV?: boolean;
    /** Defaults to 1. */
    opacity?: number;
}
/**
 * Definition for a [[PoiTable]] reference as part of the {@link Theme} object.
 */
interface PoiTableRef {
    /** Required name of the [[PoiTable]] for later reference. */
    name: string;
    /**
     * Required URL from where to load [[PoiTable]].
     *
     * Should refer to JSON that is matched [[PoiTableDef]] interface.
     */
    url: string;
    /**
     * If set to `true`, the list of values in the field "altNames" will be used as names for this
     * POI.
     */
    useAltNamesForKey: boolean;
}
/**
 * Interface descrining POI entries.
 */
interface PoiTableEntryDef {
    /** Default name of the POI as the key for looking it up. */
    name?: string;
    /** Alternative names of the POI. */
    altNames?: string[];
    /** Visibility of the POI. If `false`, the POI will not be rendered. */
    visible?: boolean;
    /** Name of the icon, defined in the the texture atlases. */
    iconName?: string;
    /** Stacking mode of the POI. For future use. */
    stackMode?: string;
    /**
     * Priority of the POI to select the visible set in case there are more POIs than can be
     * handled.
     */
    priority?: number;
    /** Minimum zoom level to render the icon on. */
    iconMinLevel?: number;
    /** Maximum zoom level to render the icon on. */
    iconMaxLevel?: number;
    /** Minimum zoom level to render the text label on. */
    textMinLevel?: number;
    /** Maximum zoom level to render the text label on. */
    textMaxLevel?: number;
}
/**
 * Fonts used for all text related rendering.
 */
interface FontCatalogConfig {
    url: string;
    name: string;
}

/**
 * A visitor for {@link Expr} nodes.
 * @internal
 */
interface ExprVisitor<Result, Context> {
    visitNullLiteralExpr(expr: NullLiteralExpr, context: Context): Result;
    visitBooleanLiteralExpr(expr: BooleanLiteralExpr, context: Context): Result;
    visitNumberLiteralExpr(expr: NumberLiteralExpr, context: Context): Result;
    visitStringLiteralExpr(expr: StringLiteralExpr, context: Context): Result;
    visitObjectLiteralExpr(expr: ObjectLiteralExpr, context: Context): Result;
    visitVarExpr(expr: VarExpr, context: Context): Result;
    visitHasAttributeExpr(expr: HasAttributeExpr, context: Context): Result;
    visitCallExpr(expr: CallExpr, context: Context): Result;
    visitLookupExpr(expr: LookupExpr, context: Context): Result;
    visitMatchExpr(expr: MatchExpr, context: Context): Result;
    visitCaseExpr(expr: CaseExpr, context: Context): Result;
    visitStepExpr(expr: StepExpr, context: Context): Result;
    visitInterpolateExpr(expr: InterpolateExpr, context: Context): Result;
}
/**
 * The dependencies of an {@link Expr}.
 * @internal
 */
declare class ExprDependencies {
    /**
     * The properties needed to evaluate the {@link Expr}.
     */
    readonly properties: Set<string>;
    /**
     * `true` if the expression depends on the feature state.
     */
    featureState?: boolean;
    /**
     * `true` if this expression cannot be cached.
     */
    volatile?: boolean;
}
/**
 * A type represeting JSON values.
 */
declare type JsonValue = null | boolean | number | string | JsonObject | JsonArray;
/**
 * A type representing JSON arrays.
 */
declare type JsonArray = JsonValue[];
/**
 * A type representing JSON objects.
 */
interface JsonObject {
    [name: string]: JsonValue;
}
/**
 * The JSON representation of an {@link Expr} object.
 */
declare type JsonExpr = JsonArray;
/**
 * Internal state needed by {@link Expr.fromJSON} to resolve `"ref"` expressions.
 */
interface ReferenceResolverState {
    definitions: Definitions;
    lockedNames: Set<string>;
    cache: Map<string, Expr>;
}
/**
 * The evaluation scope of an {@link Expr}.
 * @internal
 */
declare enum ExprScope {
    /**
     * The scope of an {@link Expr} used as value of an attribute.
     */
    Value = 0,
    /**
     * The scope of an {@link Expr} used in a [[Technique]] `when` condition.
     */
    Condition = 1,
    /**
     * The scope of an {@link Expr} used as dynamic property attribute value.
     */
    Dynamic = 2
}
/**
 * Abstract class representing the
 * {@link https://github.com/heremaps/harp.gl/blob/master/%40here/harp-datasource-protocol/StyleExpressions.md | style expressions}
 * used in {@link Theme}.
 */
declare abstract class Expr {
    /**
     * Tests of given value is an {@link Expr}.
     *
     * @param value - The object to test.
     */
    static isExpr(value: any): value is Expr;
    /**
     * Creates an expression from the given `code`.
     *
     * @param code - The code to parse.
     * @returns The parsed {@link Expr}.
     * @deprecated `string` encoded expression are deprecated. Use {@link Expr.fromJSON} instead.
     */
    static parse(code: string): Expr | never;
    /**
     * Creates a style expression from JSON.
     *
     * @remarks
     * The optional set of {@link Theme.definitions | definitions} is used
     * to resolve the {@link https://github.com/heremaps/harp.gl/blob/master/%40here/harp-datasource-protocol/StyleExpressions.md#ref | ref expressions}.
     *
     * @param json - JSON object representing the expression to parse.
     * @param definitions - Optional set of definitions used to expand references.
     * @param definitionExprCache - Optional cache of `Expr` instances
     *
     * @example
     * ```typescript
     * const expr = Expr.fromJSON(["all",
     *     ["==", ["geometry-type"], "LineString"],
     *     ["has", "text"]
     * ]);
     * ```
     */
    static fromJSON(json: JsonValue, definitions?: Definitions, definitionExprCache?: Map<string, Expr>): Expr;
    private m_dependencies?;
    private m_isDynamic?;
    /**
     * Evaluate an expression returning a {@link Value} object.
     *
     * @param env - The {@link Env} used to lookup symbols.
     * @param scope - The evaluation scope. Defaults to [[ExprScope.Value]].
     * @param cache - A cache of previously computed results.
     */
    evaluate(env: Env, scope?: ExprScope, cache?: Map<Expr, Value>): Value | never;
    /**
     * Instantiates this {@link Expr}.
     *
     * @remarks
     * references to the `get` and `has` operator using the given instantiation context.
     *
     * @param context - The [[InstantationContext]] used to resolve names.
     */
    instantiate(context: InstantiationContext): Expr;
    /**
     * Gets the dependencies of this {@link Expr}.
     */
    dependencies(): ExprDependencies;
    /**
     * Create a unique object that is structurally equivalent to this {@link Expr}.
     *
     * @param pool - The [[ExprPool]] used to create a unique
     * equivalent object of this {@link Expr}.
     */
    intern(pool: ExprPool): Expr;
    toJSON(): JsonValue;
    /**
     * Returns `true` if a dynamic execution context is required to evaluate this {@link Expr}.
     */
    isDynamic(): boolean;
    /**
     * Visits this expression.
     *
     * @param visitor The visitor used to visit the expression.
     * @param context The context passed to the vistor.
     */
    abstract accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /**
     * Update the dynamic state of this {@link Expr}.
     *
     * `exprIsDynamic` must never be called directly.
     * @internal
     */
    protected abstract exprIsDynamic(): boolean;
}
/**
 * A node representing a `get` expression.
 * @internal
 */
declare class VarExpr extends Expr {
    readonly name: string;
    constructor(name: string);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * A node representing a `literal` expression.
 * @internal
 */
declare abstract class LiteralExpr extends Expr {
    /**
     * Create a [[LiteralExpr]] from the given value.
     *
     * @param value - A constant value.
     */
    static fromValue(value: Value): Expr;
    abstract get value(): Value;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * Null literal expression.
 * @internal
 */
declare class NullLiteralExpr extends LiteralExpr {
    static instance: NullLiteralExpr;
    /** @override */
    readonly value: Value;
    protected constructor();
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * Boolean literal expression.
 * @internal
 */
declare class BooleanLiteralExpr extends LiteralExpr {
    readonly value: boolean;
    constructor(value: boolean);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
}
/**
 * Number literal expression.
 * @internal
 */
declare class NumberLiteralExpr extends LiteralExpr {
    readonly value: number;
    constructor(value: number);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
}
/**
 * String literal expression.
 * @internal
 */
declare class StringLiteralExpr extends LiteralExpr {
    readonly value: string;
    private m_promotedValue?;
    constructor(value: string);
    /**
     * Returns the value of parsing this string as [[RGBA]] or [[Pixels]] constant.
     */
    get promotedValue(): RGBA | Pixels | undefined;
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
}
/**
 * Object literal expression.
 * @internal
 */
declare class ObjectLiteralExpr extends LiteralExpr {
    readonly value: object;
    constructor(value: object);
    get isArrayLiteral(): boolean;
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
}
/**
 * A node reperesenting a `has` expression.
 * @internal
 */
declare class HasAttributeExpr extends Expr {
    readonly name: string;
    constructor(name: string);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * A node representing a `call` expression.
 * @internal
 */
declare class CallExpr extends Expr {
    readonly op: string;
    readonly args: Expr[];
    descriptor?: OperatorDescriptor;
    constructor(op: string, args: Expr[]);
    /**
     * Returns the child nodes of this {@link Expr}.
     *
     * @deprecated Use {@link CallExpr.args} instead.
     */
    get children(): Expr[];
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * A `lookup` expression is a call expression using the `lookup` operator. Then only difference is
 * that the lookup table definition (first argument) is cached as a map for fast search
 * (see {@link ExprEvaluator.visitLookupExpr}).
 * @internal
 */
declare class LookupExpr extends CallExpr {
    readonly args: Expr[];
    /**
     * Creates a lookup expression from a {@link JsonArray}.
     * @param node The {@link JsonArray} to parse.
     * @param referenceResolverState Used to resolve references to definitions.
     * @returns A LookupExpr instance.
     */
    static parseArray(node: JsonArray, referenceResolverState?: ReferenceResolverState): Expr;
    /**
     * Constructs a LookupExpr instance.
     * @param args Arguments of the lookup expression. At least an argument for the lookup table.
     */
    constructor(args: Expr[]);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
}
/**
 * The labels of a {@link MatchExpr} expression.
 * @internal
 */
declare type MatchLabel = number | string | number[] | string[];
/**
 * A node representing a `match` expression.
 * @internal
 */
declare class MatchExpr extends Expr {
    readonly value: Expr;
    readonly branches: Array<[MatchLabel, Expr]>;
    readonly fallback: Expr;
    /**
     * Tests if the given JSON node is a valid label for the `"match"` operator.
     *
     * @param node - A JSON value.
     */
    static isValidMatchLabel(node: JsonValue): node is MatchLabel;
    constructor(value: Expr, branches: Array<[MatchLabel, Expr]>, fallback: Expr);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * A node representing a `case` expression.
 * @internal
 */
declare class CaseExpr extends Expr {
    readonly branches: Array<[Expr, Expr]>;
    readonly fallback: Expr;
    constructor(branches: Array<[Expr, Expr]>, fallback: Expr);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * A node representing a `step` expression.
 * @internal
 */
declare class StepExpr extends Expr {
    readonly input: Expr;
    readonly defaultValue: Expr;
    readonly stops: Array<[number, Expr]>;
    constructor(input: Expr, defaultValue: Expr, stops: Array<[number, Expr]>);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}
/**
 * The type of the interpolation mode.
 */
declare type InterpolateMode = ['discrete'] | ['linear'] | ['cubic'] | ['exponential', number];
/**
 * A node representing an `interpolate` expression.
 * @internal
 */
declare class InterpolateExpr extends Expr {
    readonly mode: InterpolateMode;
    readonly input: Expr;
    readonly stops: Array<[number, Expr]>;
    constructor(mode: InterpolateMode, input: Expr, stops: Array<[number, Expr]>);
    /** @override */
    accept<Result, Context>(visitor: ExprVisitor<Result, Context>, context: Context): Result;
    /** @override */
    protected exprIsDynamic(): boolean;
}

declare type RemoveInterpolatedPropDef<T> = T | InterpolatedPropertyDefinition<any> extends T ? Exclude<T, InterpolatedPropertyDefinition<any>> : T;
declare type RemoveJsonExpr<T> = T | JsonExpr extends T ? Exclude<T, JsonExpr> : T;
/**
 * Make runtime representation of technique attributes from JSON-compatible typings.
 *
 * Translates
 *  - InterpolatedPropertyDefinition -> InterpolatedProperty
 *  - JsonExpr -> Expr
 */
declare type MakeTechniqueAttrs<T> = {
    [P in keyof T]: T[P] | JsonExpr extends T[P] ? RemoveInterpolatedPropDef<RemoveJsonExpr<T[P]>> | Expr : T[P];
};
/**
 * Possible techniques that can be used to draw a geometry on the map.
 */
declare type Technique = SquaresTechnique | CirclesTechnique | PoiTechnique | LineMarkerTechnique | LineTechnique | SegmentsTechnique | SolidLineTechnique | FillTechnique | StandardTechnique | TerrainTechnique | BasicExtrudedLineTechnique | StandardExtrudedLineTechnique | ExtrudedPolygonTechnique | ShaderTechnique | TextTechnique | LabelRejectionLineTechnique;
/**
 * Runtime representation of `SquaresStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `PointTechniqueParams`.
 */
interface SquaresTechnique extends MakeTechniqueAttrs<PointTechniqueParams> {
    name: 'squares';
}
/**
 * Runtime representation of `CirclesStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `PointTechniqueParams`.
 */
interface CirclesTechnique extends MakeTechniqueAttrs<PointTechniqueParams> {
    name: 'circles';
}
/**
 * Runtime representation of `PoiStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `MarkerTechniqueParams`.
 */
interface PoiTechnique extends MakeTechniqueAttrs<MarkerTechniqueParams> {
    name: 'labeled-icon';
}
/**
 * Runtime representation of `LineMarkerStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `MarkerTechniqueParams`.
 */
interface LineMarkerTechnique extends MakeTechniqueAttrs<MarkerTechniqueParams> {
    name: 'line-marker';
}
/**
 * Runtime representation of `SegmentsStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `SegmentsTechniqueParams`.
 */
interface SegmentsTechnique extends MakeTechniqueAttrs<SegmentsTechniqueParams> {
    name: 'segments';
}
/**
 * Runtime representation of `BasicExtrudedLineStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `BasicExtrudedLineTechniqueParams`.
 */
interface BasicExtrudedLineTechnique extends MakeTechniqueAttrs<BasicExtrudedLineTechniqueParams> {
    name: 'extruded-line';
}
/**
 * Runtime representation of `StandardExtrudedLineStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `StandardExtrudedLineTechniqueParams`.
 */
interface StandardExtrudedLineTechnique extends MakeTechniqueAttrs<StandardExtrudedLineTechniqueParams> {
    name: 'extruded-line';
}
/**
 * Runtime representation of `SolidLineStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `SolidLineTechniqueParams`.
 */
interface SolidLineTechnique extends MakeTechniqueAttrs<SolidLineTechniqueParams> {
    name: 'solid-line' | 'dashed-line';
}
/**
 * Runtime representation of `LineStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `LineTechniqueParams`.
 */
interface LineTechnique extends MakeTechniqueAttrs<LineTechniqueParams> {
    name: 'line';
}
/**
 * Runtime representation of `FillStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `FillTechniqueParams`.
 */
interface FillTechnique extends MakeTechniqueAttrs<FillTechniqueParams> {
    name: 'fill';
}
/**
 * Technique used to render a mesh geometry.
 * For technique parameters see `StandardTechniqueParams`.
 */
interface StandardTechnique extends MakeTechniqueAttrs<StandardTechniqueParams> {
    name: 'standard';
}
/**
 * Runtime representation of `ExtrudedPolygonStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `ExtrudedPolygonTechniqueParams`.
 */
interface ExtrudedPolygonTechnique extends MakeTechniqueAttrs<ExtrudedPolygonTechniqueParams> {
    name: 'extruded-polygon';
}
/**
 * Runtime representation of `TextStyle` as parsed by `StyleSetEvaluator`.
 * For technique parameters see `TextTechniqueParams`.
 */
interface TextTechnique extends MakeTechniqueAttrs<TextTechniqueParams> {
    name: 'text';
}
/**
 * Special technique for user-defined shaders.
 * For technique parameters see `ShaderTechniqueParams`.
 */
interface ShaderTechnique extends MakeTechniqueAttrs<ShaderTechniqueParams> {
    name: 'shader';
}
/**
 * Technique used to render a terrain geometry with textures.
 * For technique parameters see `TerrainTechniqueParams`.
 */
interface TerrainTechnique extends MakeTechniqueAttrs<TerrainTechniqueParams> {
    name: 'terrain';
}
/**
 * Technique to avoid label rendering on top of certain line geometries.
 * For technique parameters see `BaseTechniqueParams`.
 */
interface LabelRejectionLineTechnique extends MakeTechniqueAttrs<BaseTechniqueParams> {
    name: 'label-rejection-line';
}
/**
 * Additional params used for optimized usage of `Techniques`.
 */
interface IndexedTechniqueParams {
    /**
     * Optimization: Index into table in `StyleSetEvaluator` or in `DecodedTile`.
     * @hidden
     */
    _index: number;
    /**
     * Optimization: Unique `Technique` index of `Style` from which technique was derived.
     * @hidden
     */
    _styleSetIndex: number;
    /**
     * The styleSet associated to this `Technique`.
     * @hidden
     */
    _styleSet?: string;
    /**
     * The category used to assign render orders to objects created using this `Technique`.
     * @hidden
     */
    _category?: string;
    /**
     * The category used to assign render orders to secondary objects
     * created using this `Technique`.
     * @hidden
     */
    _secondaryCategory?: string;
    /**
     * `true` if any of the properties of this technique needs to access
     * the feature's state.
     *
     * @hidden
     */
    _usesFeatureState?: boolean;
    /**
     * Last computed state derived from [[Technique.kind]].
     */
    _kindState?: boolean;
}
/**
 * For efficiency, `StyleSetEvaluator` returns `Techniques` additional params as defined in
 * `IndexedTechniqueParams`.
 */
declare type IndexedTechnique = Technique & IndexedTechniqueParams;

/**
 * Defines a map tile metadata.
 */
interface TileInfo {
    readonly tileKey: TileKey;
    readonly setupTime: number;
    readonly transferList?: ArrayBuffer[];
    readonly numBytes: number;
}

/**
 * This object has geometry data in the form of geometries buffers ready to be used by WebGL.
 * These geometries are not `three.js` objects. They are pure data stored as `ArrayBuffer`s and
 * metadata describing these buffers.
 */
interface DecodedTile {
    techniques: IndexedTechnique[];
    geometries: Geometry[];
    pathGeometries?: PathGeometry[];
    textPathGeometries?: TextPathGeometry[];
    textGeometries?: TextGeometry$1[];
    poiGeometries?: PoiGeometry[];
    tileInfo?: TileInfo;
    decodeTime?: number;
    /**
     * The default bounding box in [[Tile]] is based on the geo box of the tile.
     * For data-sources that have 3d data this is not sufficient so the data-source can provide a
     * more accurate bounding box once the data is decoded.
     */
    boundingBox?: OrientedBox3;
    /**
     * Data sources not defining a bounding box may define alternatively a maximum geometry height
     * in meters. The bounding box of the resulting tile will be extended to encompass this height.
     */
    maxGeometryHeight?: number;
    /**
     * Data sources not defining a bounding box may define alternatively a minimum geometry height
     * in meters. The bounding box of the resulting tile will be extended to encompass this height.
     */
    minGeometryHeight?: number;
    /**
     * Tile data Copyright holder identifiers.
     *
     * `id`s should be unique. It is recommended to build them from unique identifiers like
     * registered domain names.
     *
     * @see [[CopyrightInfo]]
     */
    copyrightHolderIds?: string[];
    /**
     * List of {@link @arcadecity/arcade-map/geoutils#TileKey}s stored as mortonCodes representing
     * {@link @arcadecity/arcade-map/mapview#Tile}s that have geometry covering this `Tile`.
     */
    dependencies?: number[];
}
/**
 * This object keeps the path of the geometry. Space of the path depends on the
 * use case, so could be either world or local tile space.
 */
interface PathGeometry {
    path: Vector3Like[];
}
/**
 * Attributes corresponding to some decoded geometry. It may be either a map
 * of multiple attributes or just a string with the geometry's feature id (id numbers are
 * deprecated).
 */
declare type AttributeMap = {} | string | number;
/**
 * This object keeps textual data together with metadata to place it on the map.
 */
interface TextPathGeometry {
    path: number[];
    pathLengthSqr: number;
    text: string;
    technique: number;
    objInfos?: AttributeMap;
}
/**
 * Structured clone compliant WebGL interleaved buffer with its metadata attached.
 */
interface InterleavedBufferAttribute {
    buffer: ArrayBufferLike;
    stride: number;
    type: BufferElementType;
    attributes: Array<{
        name: string;
        itemSize: number;
        offset: number;
    }>;
}
/**
 * Geometry types supported by [[Geometry]] objects.
 */
declare enum GeometryType {
    Unspecified = 0,
    Point = 1,
    Line = 2,
    SolidLine = 3,
    Text = 4,
    TextPath = 5,
    ExtrudedLine = 6,
    Polygon = 7,
    ExtrudedPolygon = 8,
    Object3D = 9,
    Other = 1000
}
/**
 * Structured clone compliant version of a `three.js` geometry object, consisting of buffers with
 * metadata for map features and objects for example roads, trees or parks.
 */
interface Geometry {
    type: GeometryType;
    vertexAttributes?: BufferAttribute[];
    interleavedVertexAttributes?: InterleavedBufferAttribute[];
    index?: BufferAttribute;
    edgeIndex?: BufferAttribute;
    groups: Group[];
    uuid?: string;
    /**
     * Optional sorted list of feature start indices. The indices point into the index attribute.
     * Feature i starts at featureStarts[i] and ends at featureStarts[i+1]-1, except for the last
     * feature, which ends at index[index.length-1].
     */
    featureStarts?: number[];
    /**
     * Optional sorted list of feature start indices for the outline geometry.
     * Equivalent to {@link featureStarts} but pointing into the edgeIndex attribute.
     */
    edgeFeatureStarts?: number[];
    /**
     * Optional array of objects. It can be used to pass user data from the geometry to the mesh.
     */
    objInfos?: AttributeMap[];
    /**
     * Optional [[Array]] of [[Attachment]]s.
     */
    attachments?: Attachment[];
}
/**
 * Attachments together with [[Geometry]] define the meshes and the objects
 * of a [[Scene]].
 */
interface Attachment {
    /**
     * The unique uuid of this [[Attachment]].
     */
    uuid?: string;
    /**
     * The name of this [[Attachment]].
     */
    name?: string;
    /**
     * The index [[BufferAttribute]]. If not provided the index
     * buffer of the [[Geometry]] will be used.
     */
    index?: BufferAttribute;
    /**
     * Optional additional buffer index used to create an edge object.
     */
    edgeIndex?: BufferAttribute;
    /**
     * The draw [[Group]]]s of this [[Attachment]].
     */
    groups: Group[];
}
/**
 * The data stored in Buffers' elements can be of the following elementary types: float, signed or
 * unsigned integers (8-bit, 16-bit or 32-bit long).
 */
declare type BufferElementType = 'float' | 'uint8' | 'uint16' | 'uint32' | 'int8' | 'int16' | 'int32';
/**
 * Structured clone compliant WebGL buffer and its metadata.
 */
interface BufferAttribute {
    name: string;
    buffer: ArrayBufferLike;
    type: BufferElementType;
    itemCount: number;
    normalized?: boolean;
}
/**
 * Structured clone compliant version of a `three.js` geometry object with text to be rendered.
 * It is composed of buffers with metadata for text objects.
 */
interface TextGeometry$1 {
    positions: BufferAttribute;
    texts: number[];
    technique?: number;
    stringCatalog: Array<string | undefined>;
    objInfos?: AttributeMap[];
}
/**
 * Structured clone compliant version of a `three.js` geometry object with points of interest (POIs)
 * to be rendered. It is composed of buffers with metadata for POI objects.
 */
interface PoiGeometry extends TextGeometry$1 {
    /**
     * Names of the image texture or the name of the POI as indices into the array `stringCatalog`.
     */
    imageTextures?: number[];
    offsetDirections?: number[];
}
/**
 * Structured clone compliant WebGL group object and its metadata.
 * Its purpose is to make working with groups of objects easier.
 */
interface Group {
    start: number;
    count: number;
    technique: number;
    /**
     * Contains tile offsets if its [[Geometry]] has been created.
     */
    createdOffsets?: number[];
}

/**
 * Represents "Point" GeoJSON geometry object.
 */
interface Point {
    type: 'Point';
    coordinates: number[];
}
/**
 * Represents "MultiPoint" GeoJSON geometry object.
 */
interface MultiPoint {
    type: 'MultiPoint';
    coordinates: number[][];
}
/**
 * Represents "LineString" GeoJSON geometry object.
 */
interface LineString {
    type: 'LineString';
    coordinates: number[][];
}
/**
 * Represents "MultiLineString" GeoJSON geometry object.
 */
interface MultiLineString {
    type: 'MultiLineString';
    coordinates: number[][][];
}
/**
 * Represents "Polygon" GeoJSON geometry object.
 */
interface Polygon {
    type: 'Polygon';
    coordinates: number[][][];
}
/**
 * Represents "MultiPolygon" GeoJSON geometry object.
 */
interface MultiPolygon {
    type: 'MultiPolygon';
    coordinates: number[][][][];
}
/**
 * Represents "geometry" property of "Feature" GeoJSON object.
 */
declare type FeatureGeometry = Point | MultiPoint | LineString | MultiLineString | Polygon | MultiPolygon;
/**
 * Represents "GeometryCollection" GeoJSON geometry object.
 */
interface GeometryCollection {
    type: 'GeometryCollection';
    geometries: FeatureGeometry[];
}
/**
 * Represents "Feature" GeoJSON object.
 */
interface Feature {
    type: 'Feature';
    bbox?: number[];
    id?: string;
    geometry: FeatureGeometry | GeometryCollection;
    properties?: any;
    title?: string;
}
/**
 * Represents "FeatureCollection" GeoJSON object.
 */
interface FeatureCollection {
    type: 'FeatureCollection';
    features: Feature[];
}
/**
 * Represents a GeoJSON object.
 */
declare type GeoJson = FeatureGeometry | GeometryCollection | Feature | FeatureCollection;

/**
 * Common communication protocol for [[WorkerService]].
 */
declare namespace WorkerServiceProtocol {
    /**
     * Service id of worker manager ([[WorkerServiceManager]]) used to create/destroy service
     * instances in workers.
     */
    const WORKER_SERVICE_MANAGER_SERVICE_ID = "worker-service-manager";
    /**
     * Define possible names of messages exchanged with services within `WebWorker`.
     */
    enum ServiceMessageName {
        Initialized = "initialized",
        Request = "request",
        Response = "response"
    }
    /**
     * Interface for `ServiceMessage` which describes metadata for a service messages.
     */
    interface ServiceMessage {
        service: string;
        type: ServiceMessageName;
    }
    /**
     * This message is sent by the worker to the main thread. No data is sent. Receiving this
     * message confirms that the worker has started successfully.
     */
    interface InitializedMessage extends ServiceMessage {
        type: ServiceMessageName.Initialized;
    }
    /**
     * Type guard to check if an object is a signal message from worker.
     */
    function isInitializedMessage(message: any): message is InitializedMessage;
    /**
     * Define possible names of requests called on services within `WebWorker`.
     */
    enum Requests {
        CreateService = "create-service",
        DestroyService = "destroy-service"
    }
    /**
     * This is an internal general interface used in communication with workers.
     * Check [[ConcurrentWorkerSet]]'s invokeRequest function for exemplary usage.
     */
    interface ServiceRequest {
        type: string;
    }
    /**
     * This message is sent by the main thread to [[WorkerServiceManager]] to dynamically create a
     * new service.
     *
     * May throw `UnknownServiceError` if service of given type is not registered in
     * [[WorkerServiceManager]], see [[isUnknownServiceError]].
     */
    interface CreateServiceRequest extends ServiceRequest {
        type: Requests.CreateService;
        /**
         * Type of service to be created.
         *
         * @see [[WorkerServiceManager.register]]
         */
        targetServiceType: string;
        /**
         * The newly created service instance will be available under this id.
         */
        targetServiceId: string;
    }
    /**
     * Test if `error` thrown by [[CreateServiceRequest]] was caused by unknown type of service.
     */
    function isUnknownServiceError(error: Error): boolean;
    /**
     * This message is sent by the main thread to [[WorkerServiceManager]] to dynamically destroy a
     * service.
     */
    interface DestroyServiceRequest extends ServiceRequest {
        type: Requests.DestroyService;
        /**
         * Id of service to be destroyed.
         */
        targetServiceId: string;
    }
    /**
     * Possible service management messages (`CreateService` or `DestroyService`) sent to WebWorker.
     */
    type WorkerServiceManagerRequest = CreateServiceRequest | DestroyServiceRequest;
    /**
     * This message is a part of the Request-Response scheme implemented to be used in communication
     * between workers and the decoder.
     */
    interface RequestMessage extends ServiceMessage {
        type: ServiceMessageName.Request;
        messageId: number;
        request: any;
    }
    /**
     * Type guard to check if an object is a request message sent to a worker.
     */
    function isRequestMessage(message: any): message is RequestMessage;
    /**
     * This message is a part of the Request-Response scheme implemented to be used in communication
     * between workers and the decoder.
     */
    interface ResponseMessage extends ServiceMessage {
        type: ServiceMessageName.Response;
        messageId: number;
        errorMessage?: string;
        errorStack?: string;
        response?: object;
    }
    /**
     * Type guard to check if an object is a request message sent to a worker.
     */
    function isResponseMessage(message: any): message is ResponseMessage;
}

/**
 * Interface for `OptionsMap` which describes a general structure of key-value pairs.
 */
interface OptionsMap {
    [name: string]: any;
}
/**
 * Allows to cancel and prioritize requests inside the requestQueue.
 *
 * @remarks
 * Useful to optimize the order of decoding tiles during animations and camera movements.
 *
 * `RequestController` is not extending [[AbortController]], because this is not supported in ES5.
 */
declare class RequestController implements AbortController {
    priority: number;
    abortController: AbortController;
    /**
     * Creates an instance of `RequestController`.
     *
     * @param {number} priority
     * @param {AbortController} abortController Optional [[AbortController]] used internally, since
     *      [[AbortController]]s should not be subclassed.
     */
    constructor(priority?: number, abortController?: AbortController);
    get signal(): AbortSignal;
    /**
     * Invoking this method will set this object's AbortSignal's aborted flag and
     * signal to any observers that the associated activity is to be aborted.
     */
    abort(): void;
}

interface DecoderOptions {
    /**
     * The StyleSet to be applied during decoding.
     */
    styleSet?: Styles;
    /**
     * The Definitions to be applied during decoding.
     */
    definitions?: Definitions;
    /**
     * The Priorities to be applied during decoding.
     */
    priorities?: StylePriority[];
    /**
     * The Label Priorities to be applied during decoding.
     */
    labelPriorities?: string[];
    /**
     * A prioritized list of language codes to be applied.
     */
    languages?: string[];
}
/**
 * General type decoder which can be used to provide decoded tile data.
 */
interface ITileDecoder {
    /**
     * Connect to decoder.
     *
     * Should be implemented by implementations that use special resources that decode jobs like
     * WebWorkers.
     */
    connect(): Promise<void>;
    /**
     * Decode tile into transferrable geometry.
     *
     * Decode raw tile data (encoded with datasource specific encoding) into transferrable
     * representation of tile's geometry.
     *
     * See [[DecodedTile]].
     */
    decodeTile(data: ArrayBufferLike | {}, tileKey: TileKey, projection: Projection, requestController?: RequestController): Promise<DecodedTile | undefined>;
    /**
     * Get tile info.
     *
     * Get map features metadata associated with tile. See [[TileInfo]].
     */
    getTileInfo(data: ArrayBufferLike | {}, tileKey: TileKey, projection: Projection, requestController?: RequestController): Promise<TileInfo | undefined>;
    /**
     * Set decoder configuration.
     *
     * Configuration will take effect for next calls to results of [[decodeTile]],
     * [[decodeThemedTile]].
     *
     * Non-existing (`undefined`) options (including styleSet) are not changed.
     *
     * @param options - configuration options
     * @param customOptions - optional, new options - shape is specific for each decoder
     */
    configure(options?: DecoderOptions, customOptions?: OptionsMap): void;
    /**
     * Free all resources associated with this decoder.
     *
     * Called by users when decoder is no longer used and all resources must be freed.
     */
    dispose(): void;
}

/**
 * General type tiler which can be used to provide tile untiled payloads.
 */
interface ITiler {
    /**
     * Connect to tiler.
     *
     * Should be implemented by implementations that use special resources that decode jobs like
     * WebWorkers.
     */
    connect(): Promise<void>;
    /**
     * Register index in the tiler. Indexes registered in the tiler can be later used to retrieved
     * tiled payloads using `getTile`.
     *
     * @param indexId - Index identifier.
     * @param indexUrl - Url to the index payload, or direct GeoJson.
     */
    registerIndex(indexId: string, indexUrl: URL | GeoJson): Promise<void>;
    /**
     * Update index in the tiler. Indexes registered in the tiler can be later used to retrieved
     * tiled payloads using `getTile`.
     *
     * @param indexId - Index identifier.
     * @param indexUrl - Url to the index payload, or direct GeoJson.
     */
    updateIndex(indexId: string, indexUrl: URL | GeoJson): Promise<void>;
    /**
     * Retrieves a tile for a previously registered index.
     *
     * @param indexId - Index identifier.
     * @param tileKey - The [[TileKey]] that identifies the tile.
     */
    getTile(indexId: string, tileKey: TileKey): Promise<{}>;
    /**
     * Free all resources associated with this tiler.
     *
     * Called by users when decoder is no longer used and all resources must be freed.
     */
    dispose(): void;
}

interface PostEffects {
    bloom?: IBloomEffect;
    outline?: IOutlineEffect;
    vignette?: IVignetteEffect;
    sepia?: ISepiaEffect;
}
interface IOutlineEffect {
    enabled: boolean;
    /**
     * Make the extruded polygon disappear.
     */
    ghostExtrudedPolygons: boolean;
    thickness: number;
    color: string;
}
interface IBloomEffect {
    strength: number;
    /**
     * Pixel's brightness threshold between 0 and 1, from which the bloom should apply.
     */
    threshold: number;
    radius: number;
    enabled: boolean;
}
interface IVignetteEffect {
    enabled: boolean;
    offset: number;
    darkness: number;
}
interface ISepiaEffect {
    enabled: boolean;
    amount: number;
}

/**
 * Structure that holds near, far planes distances and maximum visibility range.
 */
interface ViewRanges {
    /**
     * Distance from camera to near clipping plane along camera eye vector.
     * @note This value is always positive and in camera space, should be bigger then zero.
     */
    near: number;
    /**
     * Far clipping plane distance in camera space, along its eye vector.
     * @note Should be always positive and bigger then [[near]] plane distance.
     */
    far: number;
    /**
     * Minimum distance that may be applied to near plane.
     *
     * Reflects minimum possible near plane distance regardless of camera orientation.
     *
     * @note Such constraint is always required because near plane can not be placed at zero
     * distance from camera (regardless of rendering Api used). Moreover this value may be
     * used as input for algorighms related to frustum planes, but rather based on visibility
     * ranges such as it does not change during tilt. Frustum planes may change dynamically with
     * camera orientation changes, while this value preserve constness for certain camera
     * position and may be used for effects like near geometry fading.
     */
    minimum: number;
    /**
     * Maximum possible distance for far plane placement.
     *
     * This accounts for maximum visibility range in camera space, regardless of camera
     * orientation. Far plane will never be placed beyond that distance, this value says
     * about viewing distance limit, thus it is constrained for performance reasons and
     * allows to compute effects applied at the end of viewing range such as fog or
     * geometry fading.
     *
     * @note Holds the maximum distance that may be applied for [[far]] plane at
     * certain camera position, it is const in between orientation changes. You may use this
     * value to calculate fog or other depth effects that are related to frustum planes,
     * but should not change as dynamically as current near/far planes distances.
     */
    maximum: number;
}

/**
 * Used internally.
 *
 * @hidden
 */
interface UniformsType {
    [index: string]: THREE$1.IUniform;
}
/**
 * Type of callback used internally by THREE.js for shader creation.
 *
 * @hidden
 */
declare type CompileCallback = (shader: THREE$1.Shader, renderer: any) => void;
/**
 * Material properties used from THREE, which may not be defined in the type.
 */
interface HiddenThreeJSMaterialProperties {
    /**
     * Informs THREE.js to re-compile material shader (due to change in code or defines).
     */
    needsUpdate?: boolean;
    /**
     * Hidden ThreeJS value that is made public here. Required to add new uniforms to subclasses of
     * [[THREE.MeshBasicMaterial]]/[[THREE.MeshStandardMaterial]], basically all materials that are
     * not THREE.ShaderMaterial.
     * @deprecated Changes to this property are ignored.
     */
    uniformsNeedUpdate?: boolean;
    /**
     * Available in all materials in ThreeJS.
     */
    transparent?: boolean;
    /**
     * Used internally for material shader defines.
     */
    defines?: any;
    /**
     * Defines callback available in THREE.js materials.
     *
     * Called before shader program compilation to generate vertex & fragment shader output code.
     */
    onBeforeCompile?: CompileCallback;
}
/**
 * Used internally.
 *
 * @hidden
 */
interface MixinShaderProperties {
    /**
     * Used internally for material shader defines.
     */
    shaderDefines?: any;
    /**
     * Used internally for shader uniforms, holds references to material internal shader.uniforms.
     *
     * Holds a reference to material's internal shader uniforms map. New custom feature based
     * uniforms are injected using this reference, but also internal THREE.js shader uniforms
     * will be available via this map after [[Material#onBeforeCompile]] callback is run with
     * feature enabled.
     * @see needsUpdate
     */
    shaderUniforms?: UniformsType;
}
/**
 * Base interface for all objects that should have animated extrusion effect.
 *
 * @remarks
 * The implementation of the actual ExtrusionFeature is done with
 * the help of the mixin class {@link ExtrusionFeatureMixin}
 * and a set of supporting functions in the namespace of the same name.
 */
interface ExtrusionFeature extends HiddenThreeJSMaterialProperties, MixinShaderProperties {
    /**
     * Ratio of the extruded objects, where `1.0` is the default value. Minimum suggested value
     * is `0.01`
     */
    extrusionRatio?: number;
}
declare namespace ExtrusionFeature {
    /**
     * Checks if feature is enabled based on {@link ExtrusionFeature} properties.
     *
     * @param extrusionMaterial -
     */
    function isEnabled(extrusionMaterial: ExtrusionFeature): boolean;
    /**
     * Patch the THREE.ShaderChunk on first call with some extra shader chunks.
     */
    function patchGlobalShaderChunks(): void;
    /**
     * Update the internals of the `ExtrusionFeature` depending on the value of [[extrusionRatio]].
     *
     * @param ExtrusionMaterial - ExtrusionFeature
     */
    function updateExtrusionFeature(extrusionMaterial: ExtrusionFeature): void;
    /**
     * This function should be called on implementors of ExtrusionFeature in the `onBeforeCompile`
     * callback of that material. It adds the required code to the shaders and declares the new
     * uniforms that control extrusion.
     *
     * @param extrusionMaterial - Material to add uniforms to.
     * @param shader - [[THREE.WebGLShader]] containing the vertex and fragment shaders to add the
     *                  special includes to.
     */
    function onBeforeCompile(extrusionMaterial: ExtrusionFeature, shader: THREE$1.Shader): void;
}

type TypeCopyFunction<T> = (src: T, dest: T) => T
type TypeCloneFunction<T> = (value: T) => T

interface PropTypeDefinition<T, D> {
    name: string
    default: D
    copy: TypeCopyFunction<T>
    clone: TypeCloneFunction<T>
}

interface PropType<T, D> extends PropTypeDefinition<T, D> {
    isType: true
}

/**
 * Base class for components.
 */

type ComponentSchemaProp = {
    default?: any
    type: PropType<any, any>
}

type ComponentSchema = {
    [propName: string]: ComponentSchemaProp
}

declare class Component<C> {
    static schema: ComponentSchema
    static isComponent: true
    constructor(props?: Partial<Omit<C, keyof Component<any>>> | false)
    copy(source: this): this
    clone(): this
    reset(): void
    dispose(): void
}

interface ComponentConstructor<C extends Component<any>> {
    schema: ComponentSchema
    isComponent: true
    new (props?: Partial<Omit<C, keyof Component<any>>> | false): C
}

/**
 * An entity in the world.
 */
declare class Entity {
    /**
     * A unique ID for this entity.
     */
    id: number

    /**
     * Whether or not the entity is alive or removed.
     */
    alive: boolean

    /**
     * Get an immutable reference to a component on this entity.
     * @param Component Type of component to get
     * @param includeRemoved Whether a component that is staled to be removed should be also considered
     */
    getComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>,
        includeRemoved?: boolean
    ): Readonly<C> | undefined

    /**
     * Get a component that is slated to be removed from this entity.
     */
    getRemovedComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>
    ): Readonly<C> | undefined

    /**
     * Get an object containing all the components on this entity, where the object keys are the component types.
     */
    getComponents(): { [componentName: string]: Component<any> }

    /**
     * Get an object containing all the components that are slated to be removed from this entity, where the object keys are the component types.
     */
    getComponentsToRemove(): { [componentName: string]: Component<any> }

    /**
     * Get a list of component types that have been added to this entity.
     */
    getComponentTypes(): Array<Component<any>>

    /**
     * Get a mutable reference to a component on this entity.
     * @param Component Type of component to get
     */
    getMutableComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>
    ): C | undefined

    /**
     * Add a component to the entity.
     * @param Component Type of component to add to this entity
     * @param values Optional values to replace the default attributes on the component
     */
    addComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>,
        values?: Partial<Omit<C, keyof Component<any>>>
    ): this

    /**
     * Remove a component from the entity.
     * @param Component Type of component to remove from this entity
     * @param forceImmediate Whether a component should be removed immediately
     */
    removeComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>,
        forceImmediate?: boolean
    ): this

    /**
     * Check if the entity has a component.
     * @param Component Type of component
     * @param includeRemoved Whether a component that is staled to be removed should be also considered
     */
    hasComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>,
        includeRemoved?: boolean
    ): boolean

    /**
     * Check if the entity has a component that is slated to be removed.
     * @param Component Type of component
     */
    hasRemovedComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>
    ): boolean

    /**
     * Check if the entity has all components in a list.
     * @param Components Component types to check
     */
    hasAllComponents(Components: Array<ComponentConstructor<any>>): boolean

    /**
     * Check if the entity has any of the components in a list.
     * @param Components Component types to check
     */
    hasAnyComponents(Components: Array<ComponentConstructor<any>>): boolean

    /**
     * Remove all components on this entity.
     * @param forceImmediate Whether all components should be removed immediately
     */
    removeAllComponents(forceImmediate?: boolean): void

    copy(source: this): this

    clone(): this

    reset(): void

    /**
     * Remove this entity from the world.
     * @param forceImmediate Whether this entity should be removed immediately
     */
    remove(forceImmediate?: boolean): void
}

declare class ObjectPool<T> {
    constructor(baseObject: { new (...args: any[]): T }, initialSize?: number)
    acquire(): T
    release(item: T): void
    expand(count: number): void
    totalSize(): number
    totalFree(): number
    totalUsed(): number
}

interface Attributes {
  priority?: number
  [propName: string]: any
}

interface SystemQueries {
  [queryName: string]: {
    components: (ComponentConstructor<any> | NotComponent<any>)[]
    listen?: {
      added?: boolean
      removed?: boolean
      changed?: boolean | ComponentConstructor<any>[]
    }
  }
}

/**
 * A system that manipulates entities in the world.
 */
declare abstract class System<EntityType extends Entity = Entity> {
  /**
   * Defines what Components the System will query for.
   * This needs to be user defined.
   */
  static queries: SystemQueries

  static isSystem: true

  constructor(world: World<EntityType>, attributes?: Attributes)

  /**
   * The results of the queries.
   * Should be used inside of execute.
   */
  queries: {
    [queryName: string]: {
      results: EntityType[]
      added?: EntityType[]
      removed?: EntityType[]
      changed?: EntityType[]
    }
  }

  world: World<EntityType>

  /**
   * Whether the system will execute during the world tick.
   */
  enabled: boolean

  /**
   * Execution priority (i.e: order) of the system.
   */
  readonly priority: number

  /**
   * Called when the system is added to the world.
   */
  init(attributes?: Attributes): void

  /**
   * Resume execution of this system.
   */
  play(): void

  /**
   * Stop execution of this system.
   */
  stop(): void

  /**
   * This function is called for each run of world.
   * All of the `queries` defined on the class are available here.
   * @param delta
   * @param time
   */
  abstract execute(delta: number, time: number): void
}

interface SystemConstructor<T extends System> {
  isSystem: true
  queries: SystemQueries
  new (...args: any): T
}

interface NotComponent<C extends Component<any>> {
  type: 'not'
  Component: ComponentConstructor<C>
}

interface WorldOptions {
    entityPoolSize?: number
    [propName: string]: any
}

/**
 * The World is the root of the ECS.
 */
declare class World<EntityType extends Entity = Entity> {
    /**
     * Whether the world tick should execute.
     */
    enabled: boolean

    /**
     * Create a new World.
     */
    constructor(options?: WorldOptions)

    /**
     * Register a component.
     * @param Component Type of component to register
     */
    registerComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>,
        objectPool?: ObjectPool<C> | false
    ): this

    /**
     * Evluate whether a component has been registered to this world or not.
     * @param Component Type of component to to evaluate
     */
    hasRegisteredComponent<C extends Component<any>>(
        Component: ComponentConstructor<C>
    ): boolean

    /**
     * Register a system.
     * @param System Type of system to register
     */
    registerSystem(System: SystemConstructor<any>, attributes?: object): this

    /**
     * Unregister a system.
     * @param System Type of system to unregister
     */
    unregisterSystem(System: SystemConstructor<any>): this

    /**
     * Get a system registered in this world.
     * @param System Type of system to get.
     */
    getSystem<S extends System>(System: SystemConstructor<S>): S

    /**
     * Get a list of systems registered in this world.
     */
    getSystems(): Array<System>

    /**
     * Update the systems per frame.
     * @param delta Delta time since the last call
     * @param time Elapsed time
     */
    execute(delta?: number, time?: number): void

    /**
     * Resume execution of this world.
     */
    play(): void

    /**
     * Stop execution of this world.
     */
    stop(): void

    /**
     * Create a new entity
     */
    createEntity(name?: string): EntityType
}

interface ECSYThreeObject3D {
  entity: ECSYThreeEntity
}

declare class ECSYThreeEntity extends Entity {
  addObject3DComponent(obj: Object3D, parentEntity?: Entity): this
  removeObject3DComponent(unparent?: boolean): void
  remove(forceImmediate?: boolean): void
  getObject3D<T extends Object3D>(): (T & ECSYThreeObject3D) | undefined
}

declare abstract class ECSYThreeSystem extends System {
  constructor(world: ECSYThreeWorld, attributes?: Attributes)

  queries: {
    [queryName: string]: {
      results: ECSYThreeEntity[]
      added?: ECSYThreeEntity[]
      removed?: ECSYThreeEntity[]
      changed?: ECSYThreeEntity[]
    }
  }

  world: ECSYThreeWorld
}

declare class ECSYThreeWorld extends World {
  getSystem<S extends System>(System: SystemConstructor<S>): S
  getSystems(): Array<ECSYThreeSystem>
  createEntity(name?: string): ECSYThreeEntity
}

interface CachedResource {
    memoryUsage: number;
}

/**
 * Refinement of `console` interface only for important information i.e `info`, `warn` and `errors`.
 */
interface ISimpleChannel {
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

declare namespace DOMUtils {
    /**
     * Gets language list used by the browser
     *
     * @returns Array of iso language codes
     */
    function getBrowserLanguages(): string[] | undefined;
}

/**
 * A `PriorityListElement` has a priority to assist in sorting. The idea is that the items in a
 * grouped priority list will not modify their priority during processing to such an amount, that
 * they will change into another group. Smaller lists are smaller to sort, and in case of resource
 * limitation (maximum number of rendered objects reached), not all items have to be sorted at all.
 */
interface PriorityListElement {
    /**
     * The integer value of this priority is used to group objects of "same" priority.
     */
    priority: number;
}
/**
 * The `PriorityListGroup` contains a list of {@link PriorityListElement}s that all have the same
 * (integer) priority.
 */
declare class PriorityListGroup<T extends PriorityListElement> {
    readonly priority: number;
    elements: T[];
    constructor(priority: number, elements?: T[]);
    /**
     * Create and return a deep copy of the `PriorityListGroup<T>`.
     *
     * @returns A clone of the `PriorityListGroup<T>`.
     */
    clone(): PriorityListGroup<T>;
    /**
     * Removes an element from the group.
     * @param element - The element to remove.
     * @returns true if the element was removed, false if it was not found in the group.
     */
    remove(element: T): boolean;
}
/**
 * The `PriorityListGroupMap` is a map to map the (integer) priority to a {@link PriorityListGroup}.
 */
declare type PriorityListGroupMap<T extends PriorityListElement> = Map<number, PriorityListGroup<T>>;
/**
 * The `GroupedPriorityList` contains a [[PriorityListGroupMap]] to manage a larger number of items
 * in priority groups.
 */
declare class GroupedPriorityList<T extends PriorityListElement> {
    readonly groups: PriorityListGroupMap<T>;
    /**
     * Add an element to the `GroupedPriorityList`. Selects group based on the elements priority.
     *
     * @param element - Element to be added.
     */
    add(element: T): void;
    /**
     * Remove an element from the `GroupedPriorityList`.
     *
     * Note: It is required that the priority is the same as it was when the element has been added.
     * Otherwise, the removal will fail.
     *
     * @param element - Element to be removed.
     * @returns `True` if the element was removed, `false` otherwise.
     */
    remove(element: T): boolean;
    /**
     * Remove all internal {@link PriorityListGroup}s.
     */
    clear(): void;
    /**
     * Merge another {@link GroupedPriorityList} into this one.
     *
     * @param other - Other group to merge.
     */
    merge(other: GroupedPriorityList<T>): GroupedPriorityList<T>;
    clone(): GroupedPriorityList<T>;
    /**
     * Apply function to all elements in this `GroupedPriorityList`.
     *
     * @param {(element: T) => void} fun Function to apply.
     */
    forEach(fun: (element: T) => void): void;
    /**
     * Count the number of elements in this `GroupedPriorityList`.
     */
    count(): number;
    /**
     * Get group of elements that have the same (integer) priority.
     *
     * @param priority - The priority to retrieve all elements from.
     */
    private findGroup;
    /**
     * Get group of elements that have the same (integer) priority.
     *
     * @param priority - The priority to retrieve all elements from.
     */
    private getGroup;
}

/**
 * Interface for the Channel classes.
 */
interface IChannel {
    trace(message?: any, ...optionalParams: any[]): void;
    debug(message?: any, ...optionalParams: any[]): void;
    log(message?: any, ...optionalParams: any[]): void;
    info(message?: any, ...optionalParams: any[]): void;
    warn(message?: any, ...optionalParams: any[]): void;
    error(message?: any, ...optionalParams: any[]): void;
}

/**
 * Enum log levels
 */
declare enum LogLevel {
    Trace = 0,
    Debug = 1,
    Log = 2,
    Info = 3,
    Warn = 4,
    Error = 5,
    None = 6
}
/**
 * Logger options to configure logger
 */
declare class LoggerOptions {
    enabled?: boolean;
    level?: LogLevel;
}
/**
 * Public interface for Logger class.
 */
interface ILogger extends IChannel {
    readonly name: string;
    enabled: boolean;
    level: LogLevel;
    /**
     * Update logger options
     *
     * @param  {LoggerOptions} options Set logger options and configure internal logger.
     */
    update(options: LoggerOptions): void;
}

interface Vec2Like {
    x: number;
    y: number;
}
declare namespace Math2D {
    /**
     * Alternative 2D box object with less memory impact (four numbers instead of two min/max
     * objects with two numbers each). Should be faster.
     */
    class Box {
        x: number;
        y: number;
        w: number;
        h: number;
        /**
         * Alternative 2D box object with less memory impact (four numbers instead of two min/max
         * objects with two numbers each). Should be faster.
         *
         * @param x - New X value.
         * @param y - New y value.
         * @param w - New w value.
         * @param h - New h value.
         */
        constructor(x?: number, y?: number, w?: number, h?: number);
        /**
         * Set new values to all properties of the box.
         *
         * @param x - New X value.
         * @param y - New y value.
         * @param w - New w value.
         * @param h - New h value.
         */
        set(x: number, y: number, w: number, h: number): void;
        /**
         * Copy values from another box.
         *
         * @param box - Another box.
         */
        copy(box: Box): void;
        /**
         * Test box for inclusion of point.
         *
         * @param x - X coordinate of point.
         * @param y - Y coordinate of point.
         */
        contains(x: number, y: number): boolean;
        /**
         * Test box for inclusion of another box.
         *
         * @param other - Box 2 to test for inclusion.
         */
        containsBox(other: Box): boolean;
        /**
         * Test two boxes for intersection.
         *
         * @param other - Box 2 to test for intersection.
         */
        intersects(other: Box): boolean;
    }
    /**
     * Box to store UV coordinates.
     */
    interface UvBox {
        s0: number;
        t0: number;
        s1: number;
        t1: number;
    }
    /**
     * Compute squared distance between two 2D points `a` and `b`.
     *
     * @param ax - Point a.x
     * @param ay - Point a.y
     * @param bx - Point b.x
     * @param by - Point b.y
     * @returns Squared distance between the two points
     */
    function distSquared(ax: number, ay: number, bx: number, by: number): number;
    /**
     * Computes the squared length of a line.
     *
     * @param line - An array of that forms a line via [x,y,z,x,y,z,...] tuples.
     */
    function computeSquaredLineLength(line: number[]): number;
    /**
     * Compute squared distance between a 2D point and a 2D line segment.
     *
     * @param px - Test point X
     * @param py - Test point y
     * @param l0x - Line segment start X
     * @param l0y - Line segment start Y
     * @param l1x - Line segment end X
     * @param l1y - Line segment end Y
     * @returns Squared distance between point and line segment
     */
    function distToSegmentSquared(px: number, py: number, l0x: number, l0y: number, l1x: number, l1y: number): number;
    /**
     * Finds the intersections of a line and a circle.
     *
     * @param xLine1 - abscissa of first line point.
     * @param yLine1 - ordinate of second line point.
     * @param xLine2 - abscissa of second line point.
     * @param yLine2 - ordinate of second line point.
     * @param radius - circle radius.
     * @param xCenter - abscissa of circle center.
     * @param yCenter - ordinate of circle center.
     * @returns coordinates of the intersections (1 if the line is tangent to the circle, 2
     * if it's secant) or undefined if there's no intersection.
     */
    function intersectLineAndCircle(xLine1: number, yLine1: number, xLine2: number, yLine2: number, radius: number, xCenter?: number, yCenter?: number): {
        x1: number;
        y1: number;
        x2?: number;
        y2?: number;
    } | undefined;
    /**
     * Computes the intersection point between two lines.
     *
     * @remarks
     * This functions computes the
     * {@link https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection
     *    | line-line intersection} of two lines given two points on each line.
     *
     * @param x1 - x coordinate of the first point of the first line.
     * @param y1 - y coordinate of the first point of the first line.
     * @param x2 - x coordinate of the second point of the first line.
     * @param y2 - y coordinate of the second point of the first line.
     * @param x3 - x coordinate of the first point of the second line.
     * @param y3 - y coordinate of the first point of the second line.
     * @param x4 - x coordinate of the second point of the second line.
     * @param y4 - y coordinate of the second point of the second line.
     * @param result - The resulting point.
     */
    function intersectLines(x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number, result?: Vec2Like): Vec2Like | undefined;
}

/**
 * Task that can be added to the [[TaskQueue]]
 */
interface Task {
    /**
     * The Function that will be executed when the [[Task]] is processed
     */
    execute: () => void;
    /**
     * The group by which similar tasks in the TaskQueue are combined
     */
    group: string;
    /**
     * A function to retrieve the priority of the [[Task]], with 0 being
     * the highest priority, and the first to be executed
     */
    getPriority: () => number;
    /**
     * An optional function that defines if a [[Task]] is alread expired
     * and therefore can be removed from the [[TaskQueue]]
     */
    isExpired?: () => boolean;
    /**
     * An optional function that returns an estimated process time,
     * this is not directly used by the [[TaskQueue]] but can be used
     * by an Task Scheduler to schedule the processing
     */
    estimatedProcessTime?: () => number;
}
interface TaskQueueOptions {
    /**
     * Groups to combine specific [[Task]]s in the [[TaskQueue]],
     * [[Task]]s can only be added to the [[TaskQueue]] if their group is available
     */
    groups: string[];
    /**
     * Optional function to sort the priority, if set, i will override the internal TaskQueue.sort
     * function.
     *
     * @remarks
     * Caution, the {@link TaskQueue} uses the last element in the Arrays first, so the
     * highest priorities should be ordered to the end
     */
    prioSortFn?: (a: Task, b: Task) => number;
}
/**
 * A Pull-TaskQueue sorted by priority and group-able {@link Task}s by {@link Task.group}.
 *
 * @remarks
 *
 * @example
 * Sample Usage
 * ```
 *  const taskQueue = new TaskQueue({
 *      group: ["group1"]
 *  })
 *  taskQueue.add({
 *     group: "group1",
 *     execute: () => {
 *         console.log("task of group1 executed");
 *     },
 *     getPrio: () => {
 *         return 0;
 *     }
 *   });
 *
 * taskQueue.update();
 * taskQueue.processNext("group1");
 *
 *  ```
 */
declare class TaskQueue {
    private readonly m_options;
    private readonly m_taskLists;
    constructor(m_options: TaskQueueOptions);
    /**
     * Updates the lists in the queue depending on their priority functions and removes
     * expired Tasks, based on their isExpired functions result.
     *
     * @param group The Group to update, if not set all groups will be updated.
     */
    update(group?: string): void;
    /**
     * Adds a Task to the Queue
     *
     * @param task
     * @returns true if succesfully added, otherwise false
     */
    add(task: Task): boolean;
    /**
     * Removes a Task from the Queue
     *
     * @param task
     * @returns true if succesfully removed, otherwise false
     */
    remove(task: Task): boolean;
    /**
     * Returns the number of remaining tasks.
     *
     * @param group if group is set, it will return only the remaining tasks for this group,
     * otherwise it will return the complete amount of tasks left.
     */
    numItemsLeft(group?: string): number;
    /**
     * Processes the next Tasks for a group
     *
     * @param group The group the Tasks are pulled from.
     * @param shouldProcess A condition that, if set will be executed before the task is processed,
     * if returns true, the task will run
     * @param n The amount of tasks that should be pulled, @defaults to 1
     * @returns false if thte list was empty
     */
    processNext(group: string, shouldProcess?: (task: Task) => boolean, n?: number): boolean;
    clear(): void;
    private pull;
    private sort;
    private getTaskList;
    private updateTaskList;
}

/**
 * Custom, app-specific URI resolver interface.
 */
interface UriResolver {
    /**
     * Attempt to resolve `URI` to `URL`.
     *
     * If given resolver doesn't know about this specific kind of `URI`, it should return string as
     * received.
     *
     * @param input - `URI`
     * @returns actual `URL` if this handler knows how locate given `uri` or original `uri`
     */
    resolveUri(uri: string): string;
}

/**
 * The `CameraMovementDetector` class checks for changes in camera position and orientation, to
 * detect continuous movements without the animation mode activated in {@link MapView}. If the
 * interaction is not continuous enough, you can use a throttling timer to reduce the number of
 * callbacks.
 */
declare class CameraMovementDetector {
    private readonly m_throttlingTimeout;
    private m_movementStartedFunc;
    private m_movementFinishedFunc;
    private m_lastAttitude?;
    private readonly m_lastCameraPos;
    private readonly m_newCameraPos;
    private m_cameraMovedLastFrame;
    private m_throttlingTimerId?;
    private m_movementDetectorDeadline;
    /**
     * Initializes the detector with timeout value and callbacks. {@link MapView} also provides
     * events for client code to be notified when these cues occur.
     *
     * @param m_throttlingTimeout - The delay, in milliseconds, between the last user interaction
     * detected and the call to `m_movementFinishedFunc`; the default is `300`.
     * @param m_movementStartedFunc - Callback function, called when the user starts interacting.
     * @param m_movementFinishedFunc - Callback function, called when the user stops interacting.
     */
    constructor(m_throttlingTimeout: number | undefined, m_movementStartedFunc: (() => void) | undefined, m_movementFinishedFunc: (() => void) | undefined);
    /**
     * Checks if the camera has moved since the last time it was checked. The
     * `m_movementStartedFunc` is called when a movement starts. If no movement
     * is detected, a timer for `m_movementFinishedFunc` starts.
     *
     * @param mapView - [[Mapview]]'s position and camera are checked for modifications.
     */
    checkCameraMoved(mapView: MapView, now: number): boolean;
    /**
     * Reset the saved camera position. Next time checkCameraMoved is called, it will return
     * `false`.
     */
    clear(mapView: MapView): void;
    /**
     * Force change of camera position. Next time checkCameraMoved is called, it will return `true`.
     */
    forceMoved(): void;
    /**
     * Returns `true` if the camera of this {@link MapView} is currently moving. In this case the
     * `m_movementFinishedFunc` is waiting to be called after the throttling timer runs out.
     */
    get cameraIsMoving(): boolean;
    /**
     * Disposes resources and kills the throttling timer.
     */
    dispose(): void;
    /**
     * Returns `true` if the camera has moved in the last frame.
     */
    get cameraMovedLastFrame(): boolean;
    private movementStarted;
    private movementFinished;
    private startMovementFinishedTimer;
    private readonly onDeadlineTimer;
    private removeMovementFinishedTimer;
}

interface DisplacementMap {
    xCountVertices: number;
    yCountVertices: number;
    buffer: Float32Array;
}
interface TileDisplacementMap {
    tileKey: TileKey;
    texture: THREE.DataTexture;
    displacementMap: DisplacementMap;
    geoBox: GeoBox;
}

interface ElevationProvider {
    /**
     * Get elevation for a given geo point.
     *
     * @param geoPoint - geo position to query height for.
     * @param level - Optional data level that should be used for getting the elevation.
     *              If undefined, the view's visible tile containing the point will be used.
     * @returns The height at geoPoint or undefined if no tile was found that covers the geoPoint.
     */
    getHeight(geoPoint: GeoCoordinates, level?: number): number | undefined;
    /**
     * Samples elevation for a given geo point from the specified displacement map.
     *
     * @param geoPoint - geo position to query height for.
     * @param tileDisplacementMap - Displacement map where the height will be sampled.
     * @returns The height at geoPoint.
     */
    sampleHeight(geoPoint: GeoCoordinates, tileDisplacementMap: TileDisplacementMap): number;
    /**
     * Cast a ray through the given screen position x, y.
     *
     * @param x - The X position in css/client coordinates (without applied display ratio).
     * @param y - The Y position in css/client coordinates (without applied display ratio).
     * @returns World coordinate of the intersection or undefined if no intersection detected.
     */
    rayCast(x: number, y: number): THREE$1.Vector3 | undefined;
    /**
     * Get the displacement map for a given tile key. If the displacement map for the given tileKey
     * is not in the cache a lower level tile will be returned.
     *
     * @param tileKey - The tile to get the displacement map for.
     * @returns Returns the DisplacementMap for the given tileKey or a lower level tile. Undefined
     *          if the tile or no parent is in the cache.
     */
    getDisplacementMap(tileKey: TileKey): TileDisplacementMap | undefined;
    /**
     * @returns the TilingScheme used for the DisplacementMaps returned by [[getDisplacementMap]]
     * or undefined if there is no elevation {@link DataSource} attached to the {@link MapView}.
     */
    getTilingScheme(): TilingScheme | undefined;
    /**
     * Clears the internal cache.
     */
    clearCache(): void;
}

interface ClipPlanesEvaluator {
    /**
     * Minimum elevation to be rendered, values beneath the sea level are negative.
     */
    minElevation: number;
    /**
     * Set maximum elevation to be rendered, values above sea level are positive.
     */
    maxElevation: number;
    /**
     * Compute near and far clipping planes distance.
     *
     * @remarks
     * Evaluation method should be called on every frame  and camera clip planes updated.
     * This is related to evaluator implementation and its input data, that may suddenly change
     * such as camera position or angle, projection type or so.
     * Some evaluators may not depend on all or even any of input objects, but to preserve
     * compatibility with any evaluator type it is strongly recommended to update on every frame.
     * @note The camera clipping planes (near/far properties) aren't automatically updated
     * via #evaluateClipPlanes() call, user should do it manually if needed.
     * @param camera - The camera in use.
     * @param projection - The geo-projection currently used for encoding geographic data.
     * @param elevationProvider - The optional elevation provider for fine tuned range calculation,
     * taking into account terrain variability and unevenness.
     *
     */
    evaluateClipPlanes(camera: THREE$1.Camera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
}
/**
 * Abstract evaluator class that adds support for elevation constraints.
 *
 * @remarks
 * Classes derived from this should implement algorithms that takes into account rendered
 * features height (elevations), such as ground plane is no more flat (or spherical), but
 * contains geometry that should be overlapped by frustum planes.
 */
declare abstract class ElevationBasedClipPlanesEvaluator implements ClipPlanesEvaluator {
    private m_maxElevation;
    private m_minElevation;
    constructor(maxElevation: number, minElevation: number);
    abstract evaluateClipPlanes(camera: THREE$1.Camera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    /**
     * Set maximum elevation above sea level to be rendered.
     *
     * @remarks
     * @param elevation - the elevation (altitude) value in world units (meters).
     * @note If you set this exactly to the maximum rendered feature height (altitude above
     * the sea, you may notice some flickering or even polygons disappearing related to rounding
     * errors or depth buffer precision. In such cases increase [[nearFarMargin]] or add a little
     * bit offset to your assumed maximum elevation.
     * @note Reasonable values are in between (-DeadSeeDepression, MtEverestHeight>, both values
     * are defined in [[EarthConstant]] as [[EarthConstant.MIN_ELEVATION]] and
     * [[EarthConstant.MAX_ELEVATION]] respectively.
     * @see minElevation for more information about precision and rounding errors.
     */
    set maxElevation(elevation: number);
    /**
     * Get maximum elevation to be covered by camera frustum.
     */
    get maxElevation(): number;
    /**
     * Set minimum elevation to be rendered, values beneath the sea level are negative.
     *
     * @remarks
     * @param elevation - the minimum elevation (depression) in world units (meters).
     * @note If you set this parameter to zero you may not see any features rendered if they are
     * just below the sea level more than half of [[nearFarMargin]] assumed. Similarly if set to
     * -100m and rendered features lays exactly in such depression, you may notice that problem.
     * The errors usually come from projection precision loss and depth buffer nature (significant
     * precision loss closer to far plane). Thus is such cases either increase the margin (if you
     * are sure features are just at this elevation, or setup bigger offset for [[minElevation]].
     * Reasonable values are between <-DeadSeaDepression, MtEverestHeight), where the first denotes
     * lowest depression on the Earth defined as [[EarthConstants.MIN_ELEVATION]] and the second is
     * the highest point our planet.
     * @see https://developer.nvidia.com/content/depth-precision-visualized
     */
    set minElevation(elevation: number);
    /**
     * Get minimum elevation to be covered by camera frustum.
     */
    get minElevation(): number;
}
/**
 * Top view, clip planes evaluator that computes view ranges based on ground distance and elevation.
 *
 * @deprecated Default evaluator {@link TiltViewClipPlanesEvaluator} supports top-down views.
 *
 * @remarks
 * This evaluator supports both planar and spherical projections, although it behavior is
 * slightly different in each case. General algorithm sets near plane and far plane close
 * to ground level, but taking into account maximum and minimum elevation of features on the ground.
 *
 * @note This evaluator supports only cameras which are always looking down the ground surface
 * (top-down view) along surface normal and does not preserve correct clip planes when
 * modifying camera pitch (tilt) angle. In simple words it is suitable only for top view camera
 * settings.
 */
declare class TopViewClipPlanesEvaluator extends ElevationBasedClipPlanesEvaluator {
    readonly nearMin: number;
    readonly nearFarMarginRatio: number;
    readonly farMaxRatio: number;
    /**
     * Helper for reducing number of objects created at runtime.
     */
    protected m_tmpVectors: THREE$1.Vector3[];
    /**
     * Helper object for reducing performance impact.
     */
    protected m_tmpQuaternion: THREE$1.Quaternion;
    private readonly m_minimumViewRange;
    /**
     * Allows to setup near/far offsets (margins), rendered geometry elevation relative to sea
     * level as also minimum near plane and maximum far plane distance constraints.
     *
     * @remarks
     * It is strongly recommended to set some reasonable [[nearFarMargin]] (offset) between near
     * and far planes to avoid flickering.
     * @param maxElevation - defines near plane offset from the ground in the surface normal
     * direction, positive values allows to render elevated terrain features (mountains,
     * buildings). Defaults to Burj Khalifa building height.
     * @param minElevation - defines far plane offset from the ground surface, negative values moves
     * far plane below the ground level (use it to render depressions). Default zero - sea level.
     * @param nearMin - minimum allowable near plane distance from camera, must be bigger than zero.
     * @param nearFarMarginRatio - minimum distance between near and far plane, as a ratio of
     * average near/far plane distance, it have to be significantly bigger than zero (especially if
     * [[maxElevation]] and [[minElevation]] are equal), otherwise you may notice flickering when
     * rendering, or even render empty scene if frustum planes are almost equal.
     * @param farMaxRatio - maximum ratio between ground and far plane distance, allows to limit
     * viewing distance at overall. Have to be bigger than 1.0.
     * @note Keep in mind that this evaluator does not evaluate terrain (or building) elevation
     * automatically, to keep such features rendered (between frustum planes) use [[minElevation]],
     * [[maxElevation]] constraints. You may change this parameters at any time, but it requires
     * repeating [[evaluatePlanes]] step, if your camera is moving you need to evaluate planes
     * anyway.
     * @note You may treat [[minElevation]] and [[maxElevation]] parameters as the maximum and
     * minimum renderable elevation respectively along the surface normal, when camera is
     * constantly looking downwards (top-down view). If you need {@link ClipPlanesEvaluator} for
     * cameras that support tilt or yaw please use {@link TiltViewClipPlanesEvaluator}.
     * @note [[nearFarMaxRatio]] does not limit far plane when spherical projection is in use,
     * the algorithm used there estimates distance to point on tangent where line from camera
     * touches the sphere horizon and there is no reason to clamp it.
     */
    constructor(maxElevation?: number, minElevation?: number, nearMin?: number, nearFarMarginRatio?: number, farMaxRatio?: number);
    /** @override */
    evaluateClipPlanes(camera: THREE$1.Camera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    /**
     * Get minimum view range that is possible to achieve with current evaluator settings.
     * @note This value will not change after evaluator is constructed.
     */
    protected get minimumViewRange(): ViewRanges;
    protected evaluateDistancePlanarProj(camera: THREE$1.PerspectiveCamera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    protected evaluateDistanceSphericalProj(camera: THREE$1.PerspectiveCamera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    protected getFovBasedFarPlane(camera: THREE$1.PerspectiveCamera, d: number, r: number, fovAngle: number, projection: Projection): number;
}
/**
 * Evaluates camera clipping planes taking into account ground distance and camera tilt (pitch)
 * angle (angle between look-at vector and ground surface normal).
 */
declare class TiltViewClipPlanesEvaluator extends TopViewClipPlanesEvaluator {
    private readonly m_tmpV2;
    /** @override */
    protected evaluateDistancePlanarProj(camera: THREE$1.PerspectiveCamera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    /** @override */
    protected evaluateDistanceSphericalProj(camera: THREE$1.PerspectiveCamera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    private computeNearDistSphericalProj;
    private computeFarDistSphericalProj;
    private applyViewRangeConstraints;
}
/**
 * Creates default {@link ClipPlanesEvaluator}.
 * @internal
 */
declare const createDefaultClipPlanesEvaluator: () => TiltViewClipPlanesEvaluator;

/**
 * `IPassManager` provides a base interface for {@link Pass}
 * managers like {@link MapRenderingManager}.
 */
interface IPassManager {
    /**
     * The render method to extend in `IPassManager`'s implementations. This is the place where the
     * desired setups and effect composing and chaining happen.
     */
    render(renderer: THREE$1.WebGLRenderer, ...args: any[]): void;
    /**
     * The resize method to extend in {@link Pass} implementations
     * to resize the render targets to match
     * the size of the visible canvas. It should be called on resize events.
     *
     * @param width - Width to resize to.
     * @param height - Height to resize to.
     */
    setSize(width: number, height: number): void;
}

/**
 * The interface for the {@link Pass} class.
 */
interface IPass {
    /**
     * Whether the {@link Pass} instance is active or not.
     * @default `true`.
     */
    enabled: boolean;
    /**
     * Whether the render method should target a WebGLRenderTarget instance, or the frame buffer.
     * @default `false`.
     */
    renderToScreen: boolean;
    /**
     * The resize method to extend in {@link Pass} implementations.
     *
     * @remarks
     * It resizes the render targets. Call on resize events.
     *
     * @param width - Width to resize to.
     * @param height - Height to resize to.
     */
    setSize(width: number, height: number): void;
    /**
     * The render method to extend in {@link Pass} implementations.
     *
     * @remarks
     * This is the place where the desired
     * effects or render operations are executed.
     *
     * @param renderer - The WebGLRenderer instance in use.
     * @param scene - The scene to render.
     * @param camera - The camera to render the scene through.
     * @param writeBuffer - The optional WebGLRenderTarget instance to write to.
     * @param readBuffer - The optional WebGLRenderTarget instance of a previous pass to write onto.
     * @param delta - The time argument from the requestAnimationFrame.
     */
    render(renderer: THREE$1.WebGLRenderer, scene: THREE$1.Scene, camera: THREE$1.Camera, writeBuffer: THREE$1.WebGLRenderTarget | null, readBuffer: THREE$1.WebGLRenderTarget | null, delta?: number): void;
}
/**
 * The base class to extend for further passes in {@link MapView},
 * like the {@link MSAARenderPass},
 *
 * @remarks
 * `Pass` provides the core logic for both :
 * - render passes (proper scene renders),
 * - and shader passes (quad renders, i.e. effects added on top of the render output as a
 * postprocess).
 *
 * Even some shader passes still actually fall within the render pass category as they need to
 * re-render the scene to then deduce an effect, such as masking, AO, DoF etc. Others just need the
 * previous input image to apply a shader on top of it, as for bloom or NVIDIA's FXAA for example.
 * These only are proper shader passes.
 */
declare class Pass implements IPass {
    enabled: boolean;
    renderToScreen: boolean;
    setSize(width: number, height: number): void;
    render(renderer: THREE$1.WebGLRenderer, scene: THREE$1.Scene, camera: THREE$1.Camera, writeBuffer: THREE$1.WebGLRenderTarget | null, readBuffer: THREE$1.WebGLRenderTarget | null, delta?: number): void;
}

/**
 * This enum represents the sampling level to apply to
 * a {@link MSAARenderPass} instance. At level 0,
 * only one sample is performed, which is like
 * disabling the MSAA pass.
 */
declare enum MSAASampling {
    'Level_0' = 0,
    'Level_1' = 1,
    'Level_2' = 2,
    'Level_3' = 3,
    'Level_4' = 4,
    'Level_5' = 5
}
/**
 * {@link MapView}'s MSAA implementation.
 *
 * @remarks
 * MSAA stands for Multi Sampling Anti-Aliasing, and its concept
 * is to provide a rendering engine with additional color values for each pixel, so they can include
 * the missing bits between them on a screen. WebGL already comes with a native MSAA implementation
 * with four samples. Because of its native nature, it is more efficient and one may not want to use
 * MapView's MSAA implementation when these four samples are satisfying. However in some situations
 * they are not: on low devices, MSAA can impact the framerate and we may desire to reduce the
 * number of samples at runtime. On the other hand, when the interaction stops, the engine also
 * stops rendering the map, and because a map relies on many line-like patterns, aliasing can then
 * turn very noticeable. In such static renders, the number of samples could be dramatically
 * increased on a last frame to render.
 */
declare class MSAARenderPass extends Pass {
    /**
     * The sampling level determines the number of samples that will be performed per frame.
     * Renders will happen `2 ^ samplingLevel` time(s). `samplingLevel` stands between `0` and `5`.
     * Therefore there can be between 1 and 32 samples.
     *
     * @default `SamplingLevel.Level_1`
     */
    samplingLevel: MSAASampling;
    private m_renderTarget;
    private readonly m_localCamera;
    private readonly m_quadScene;
    private readonly m_quadUniforms;
    private readonly m_quadMaterial;
    private readonly m_quad;
    private readonly m_tmpColor;
    /**
     * The constructor for `MSAARenderPass`. It builds an internal scene with a camera looking at a
     * quad.
     *
     * @param m_scene - The scene to render.
     * @param m_camera - The camera to render the scene through.
     */
    constructor();
    /**
     * Releases all used resources.
     */
    dispose(): void;
    /**
     * The render function of `MSAARenderPass`.
     *
     * @remarks
     * At each call of this method, and for each sample the {@link MapView}
     * camera provided in the `render method is offset within the dimension of a
     * pixel on screen. It then renders the whole scene with this offset to a local
     * `WebGLRenderTarget` instance, via a `WebGLRenderer` instance. Finally the local camera
     * created in the constructor shoots the quad and renders to the write buffer or to the frame
     * buffer. The quad material's opacity is modified so the renders can accumulate in the
     * targetted buffer.
     *
     * The number of samples can be modified at runtime through the enum [[SamplingLevel]].
     *
     * If there is no further pass, the {@link Pass.renderToScreen} flag can be set to `true` to
     * output directly to the framebuffer.
     *
     * @param renderer - The ThreeJS WebGLRenderer instance to render the scene with.
     * @param scene - The ThreeJS Scene instance to render the scene with.
     * @param camera - The ThreeJS Camera instance to render the scene with.
     * @param writeBuffer - A ThreeJS WebGLRenderTarget instance to render the scene to.
     * @param readBuffer - A ThreeJS WebGLRenderTarget instance to render the scene.
     * @override
     */
    render(renderer: THREE$1.WebGLRenderer, scene: THREE$1.Scene, camera: THREE$1.PerspectiveCamera | THREE$1.OrthographicCamera, writeBuffer: THREE$1.WebGLRenderTarget | null, readBuffer: THREE$1.WebGLRenderTarget): void;
    /**
     * Resize the internal render target to match the new size specified.
     *
     * @param width - New width to apply to the render target.
     * @param height - New height to apply to the render target.
     * @override
     */
    setSize(width: number, height: number): void;
    /**
     * The list of offsets to apply to the camera, per sampling level, adapted from :
     *
     * @see https://msdn.microsoft.com/en-us/library/windows/desktop/ff476218%28v=vs.85%29.aspx?f=255&MSPPError=-2147217396
     */
    static readonly OffsetVectors: number[][][];
}

/**
 * Interface for the antialias settings passed when instantiating
 * a {@link MapView}, and transferred to
 * the {@link MapRenderingManager} instance.
 *
 * @remarks
 * These parameters can be changed at runtime as opposed to
 * the native WebGL antialiasing.
 */
interface IMapAntialiasSettings {
    /**
     * Whether the MSAA is enabled or not.
     *
     * @default `false`
     */
    msaaEnabled: boolean;
    /**
     * The sampling level to use for MSAA during continuous rendering.
     *
     * @default `MSAASampling.Level_1`
     */
    dynamicMsaaSamplingLevel?: MSAASampling;
    /**
     * The sampling level to use for MSAA when the rendering stops.
     *
     * @default `MSAASampling.Level_4`
     */
    staticMsaaSamplingLevel?: MSAASampling;
}
/**
 * The `MapRenderingManager` class manages the map rendering (as opposed to text) by dispatching the
 * {@link MapRenderingManager.render} call to a set of internal {@link Pass} instances.
 *
 * @remarks It provides an API to modify some of the rendering
 * processes like the antialiasing behaviour at runtime.
 */
interface IMapRenderingManager extends IPassManager {
    /**
     * Bloom effect parameters.
     */
    bloom: IBloomEffect;
    /**
     * Outline effect parameters.
     */
    outline: IOutlineEffect;
    /**
     * Vignette effect parameters.
     */
    vignette: IVignetteEffect;
    /**
     * Sepia effect parameters.
     */
    sepia: ISepiaEffect;
    /**
     * Set a `pixelRatio` for dynamic rendering (i.e. during animations). If a value is specified,
     * the `LowResRenderPass` will be employed to used to render the scene into a lower resolution
     * render target, which will then be rendered to the screen.
     */
    lowResPixelRatio?: number;
    /**
     * The level of MSAA sampling while the user interacts. It should be a low level so that the
     * MSAA does not impact the framerate.
     */
    dynamicMsaaSamplingLevel: MSAASampling;
    /**
     * Enable or disable the MSAA. If disabled, `MapRenderingManager` will use the renderer provided
     * in the {@link MapRenderingManager.render} method to render the scene.
     */
    msaaEnabled: boolean;
    /**
     * The higher level of MSAA sampling for a last frame to render, when the camera is static. It
     * can be a high level, providing high quality renders requiring few tens of seconds, since no
     * frame is expected to immediately follow in the requestAnimationFrame. It is still limited by
     * zooming, since zooming is not requestAnimationFrame-based and can lead to stuttering if the
     * render time is too long, except on desktop Mac, where mouse interaction already implements
     * some damping. Higher levels of sampling may lead to noticeable color banding, visible in
     * areas with a slight color gradient, like large areas or the sky background.
     */
    staticMsaaSamplingLevel: MSAASampling;
    /**
     * The method to call to render the map. This method depends on an `isStaticFrame` boolean that
     * notifies the pass manager to switch to a higher level render quality for the last frame.
     *
     * @param renderer - The ThreeJS WebGLRenderer instance to render the map with.
     * @param isStaticFrame - Whether the frame to render is static or dynamic. Selects level of
     * antialiasing.
     * @param time - Optional time argument provided by the requestAnimationFrame, to pass to
     * sub-passes.
     */
    render(renderer: THREE$1.WebGLRenderer, scene: THREE$1.Scene, camera: THREE$1.PerspectiveCamera | THREE$1.OrthographicCamera, isStaticFrame: boolean, time?: number): void;
    /**
     * Updating the outline rebuilds the outline materials of every outlined mesh.
     *
     * @param options - outline options from the {@link @arcadecity/arcade-map/datasource-protocol#Theme}.
     */
    updateOutline(options: {
        thickness: number;
        color: string;
        ghostExtrudedPolygons: boolean;
    }): void;
}
/**
 * The implementation of {@link IMapRenderingManager} to
 * instantiate in {@link MapView} and manage the map
 * rendering.
 */
declare class MapRenderingManager implements IMapRenderingManager {
    bloom: {
        enabled: boolean;
        strength: number;
        radius: number;
        threshold: number;
    };
    outline: {
        enabled: boolean;
        thickness: number;
        color: string;
        ghostExtrudedPolygons: boolean;
        needsUpdate: boolean;
    };
    vignette: {
        enabled: boolean;
        offset: number;
        darkness: number;
    };
    sepia: {
        enabled: boolean;
        amount: number;
    };
    private m_width;
    private m_height;
    private m_outlineEffect?;
    private m_msaaPass;
    private readonly m_renderPass;
    private readonly m_target1;
    private readonly m_target2;
    private m_bloomPass?;
    private m_sepiaPass;
    private m_vignettePass;
    private readonly m_readBuffer;
    private m_dynamicMsaaSamplingLevel;
    private m_staticMsaaSamplingLevel;
    private m_lowResPass;
    /**
     * The constructor of `MapRenderingManager`.
     *
     * @param width - Width of the frame buffer.
     * @param height - Height of the frame buffer.
     * @param lowResPixelRatio - The `pixelRatio` determines the resolution of the internal
     *  `WebGLRenderTarget`. Values between 0.5 and `window.devicePixelRatio` can be tried to give
     * good results. A value of `undefined` disables the low res render pass. The value should not
     * be larger than`window.devicePixelRatio`.
     * @param antialiasSetting - The object defining the demeanor of MSAA.
     */
    constructor(width: number, height: number, lowResPixelRatio: number | undefined, antialiasSettings?: IMapAntialiasSettings | undefined);
    updateOutline(options: {
        thickness: number;
        color: string;
        ghostExtrudedPolygons: boolean;
    }): void;
    /**
     * The method to call to render the map with the `MapRenderingManager` instance. It contains the
     * chain of sub-passes that can transfer the write and read buffers, and other sheer rendering
     * conditions as disabling AA when a high DPI device is in use.
     *
     * @param renderer - The ThreeJS WebGLRenderer instance to render the map with.
     * @param scene - The ThreeJS Scene instance containing the map objects to render.
     * @param camera - The ThreeJS Camera instance to render the scene through.
     * @param isStaticFrame - Whether the frame to render is static or dynamic. Selects level of
     * antialiasing.
     */
    render(renderer: THREE$1.WebGLRenderer, scene: THREE$1.Scene, camera: THREE$1.PerspectiveCamera | THREE$1.OrthographicCamera, isStaticFrame: boolean): void;
    /**
     * The resize function to call on resize events to resize the render targets. It shall include
     * the resize methods of all the sub-passes used in `MapRenderingManager`.
     *
     * @param width - New width to use.
     * @param height - New height to use.
     */
    setSize(width: number, height: number): void;
    /**
     * The `lowResPixelRatio` determines the resolution of the internal `WebGLRenderTarget`. Values
     * between 0.5 and `window.devicePixelRatio` can be tried to give  good results. A value of
     * `undefined` disables the low res render pass. The value should not be larger than
     * `window.devicePixelRatio`.
     */
    get lowResPixelRatio(): number | undefined;
    set lowResPixelRatio(pixelRatio: number | undefined);
    /**
     * Set the level of sampling while the user interacts.
     *
     * @param samplingLevel - The sampling level.
     */
    set dynamicMsaaSamplingLevel(samplingLevel: MSAASampling);
    /**
     * Return the sampling level defined during continuous rendering.
     */
    get dynamicMsaaSamplingLevel(): MSAASampling;
    /**
     * Enable or disable the MSAA. If disabled, `MapRenderingManager` will use the renderer provided
     * in the {@link MapRenderingManager.render} method to render the scene.
     *
     * @param value - If `true`, MSAA is enabled, disabled otherwise.
     */
    set msaaEnabled(value: boolean);
    /**
     * Return whether the MSAA is enabled.
     */
    get msaaEnabled(): boolean;
    /**
     * Set the sampling level for rendering static frames.
     *
     * @param samplingLevel - The sampling level.
     */
    set staticMsaaSamplingLevel(samplingLevel: MSAASampling);
    /**
     * Return the sampling level defined for rendering static frames.
     */
    get staticMsaaSamplingLevel(): MSAASampling;
}

/**
 * Copyright info attached to data displayed on map. Provided by {@link DataSource} and attached
 * to {@link Tile}s.
 *
 * In most cases, an application should display this information on {@link MapView} to conform with
 * licencing terms of its map data providers.
 *
 * @see {@link CopyrightElementHandler}
 */
interface CopyrightInfo {
    /**
     * Unique id of the copyright holder.
     *
     * @remarks
     * `id`s should be unique. It is recommended to build them from unique identifiers like
     * registered domain names.
     *
     * Examples:
     *
     *  * `openstreetmap.org` - for data originating from OpenStreetMap project
     *  * `naturalearthdata.com` - for data originating from Natural Earth dataset
     *
     * Note: {@link DataSource} may return {@link CopyrightInfo}
     * with only `id`, thus defining only holder
     * of copyright, however, valid attribution may require proper `label` and `link`.
     *
     * Entries with same `id` are deduplicated by {@link CopyrightInfo.mergeArrays}.
     */
    id: string;
    /**
     * Copyright text to display after the copyright symbol on the map.
     *
     * If undefined, `id` is used as text label.
     * Set it to empty string to not render a copyright info.
     */
    label?: string;
    /**
     * Optional URL pointing to further copyright information.
     */
    link?: string;
    /**
     * Optional, copyright notice year.
     */
    year?: number;
}
declare namespace CopyrightInfo {
    /**
     * Merge {@link CopyrightInfo} arrays, removing duplicates.
     *
     * `id` and `label` are considered keys in deduplication algorithm.
     *
     * @param sources - non-duplicate elements from this array are added to `target`
     * @returns merge of all copyright infos in `sources`
     */
    function mergeArrays(a: CopyrightInfo[], b?: CopyrightInfo[]): CopyrightInfo[];
    /**
     * Format copyright information to a HTML string that can be displayed in the UI.
     *
     * * Empty list returns empty string.
     * * Entries with empty (but defined) labels are skipped.
     *
     * @param copyrightInfo - Array of copyrights to format.
     */
    function formatAsHtml(copyrightInfo: CopyrightInfo[]): string;
}

/**
 * Status of the elevation range calculation.
 */
declare enum CalculationStatus {
    PendingApproximate = 0,
    FinalPrecise = 1
}
/**
 * Elevation range with an optional calculation status.
 */
interface ElevationRange {
    minElevation: number;
    maxElevation: number;
    calculationStatus?: CalculationStatus;
}
/**
 * Source for elevation ranges per tile. The returned elevation ranges will be used in the visible
 * tile computation to calculate proper bounding boxes.
 */
interface ElevationRangeSource {
    /**
     * Compute the elevation range for a given {@link @arcadecity/arcade-map/geoutils#TileKey}.
     * @param tileKey - The tile for which the elevation range should be computed.
     */
    getElevationRange(tileKey: TileKey): ElevationRange;
    /**
     * The tiling scheme of this {@link ElevationRangeSource}.
     *
     * @remarks
     * {@link MapView} will only apply the elevation
     * ranges returned by [[getElevationRange]] that have
     * the same {@link @arcadecity/arcade-map/geoutils#TilingScheme}.
     */
    getTilingScheme(): TilingScheme;
    /**
     * Connects to the underlying data.
     */
    connect(): Promise<void>;
    /**
     * Returns `true` if this `ElevationRangeSource` is ready and the {@link MapView} can invoke
     * `getElevationRange()` to start requesting data.
     */
    ready(): boolean;
}

/**
 * Loads the geometry for its {@link Tile}. Loads all geometry in a single step.
 * @internal
 */
declare class TileGeometryLoader {
    private readonly m_tile;
    private readonly m_taskQueue;
    /**
     * Make sure that all technique have their geometryKind set, either from the theme or their
     * default value.
     *
     * Also gather set of the [[GeometryKind]]s found in the techniques and return it.
     *
     * @param {DecodedTile} decodedTile
     * @returns {GeometryKindSet} The set of kinds used in the decodeTile.
     */
    static prepareAvailableGeometryKinds(decodedTile: DecodedTile): GeometryKindSet;
    /**
     * Make sure that the technique has its geometryKind set, either from the theme or their default
     * value.
     *
     * @param {Technique} technique
     */
    static compileGeometryKind(technique: Technique): GeometryKind | GeometryKindSet;
    private m_decodedTile?;
    private m_availableGeometryKinds;
    private m_enabledKinds;
    private m_disabledKinds;
    private m_priority;
    private m_state;
    private m_finishedPromise;
    private m_resolveFinishedPromise?;
    private m_rejectFinishedPromise?;
    constructor(m_tile: Tile, m_taskQueue: TaskQueue);
    set priority(value: number);
    getPriority(): number;
    /**
     * The {@link Tile} this `TileGeometryLoader` is managing.
     */
    get tile(): Tile;
    /**
     * `True` if a decoded Tile is set
     */
    get hasDecodedTile(): boolean;
    /**
     * `True` if all geometry of the `Tile` has been loaded and the loading process is finished.
     */
    get isFinished(): boolean;
    /**
     * `True` if loader is finished, canceled or disposed.
     */
    get isSettled(): boolean;
    /**
     * Returns a promise resolved when this `TileGeometryLoader` is in
     * `TileGeometryLoaderState.Finished` state, or rejected when it's in
     * `TileGeometryLoaderState.Cancelled` or `TileGeometryLoaderState.Disposed` states.
     */
    waitFinished(): Promise<void>;
    /**
     * Set the {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile} of the tile.
     *
     * @remarks
     * Is called after the decoded tile has been loaded, and
     * prepares its content for later processing in the 'updateXXX' methods.
     *
     * @param {DecodedTile} decodedTile The decoded tile with the flat geometry data belonging to
     *      this tile.
     * @returns {DecodedTile} The processed decoded tile.
     */
    setDecodedTile(decodedTile: DecodedTile): DecodedTile;
    /**
     * The kinds of geometry stored in this {@link Tile}.
     */
    get availableGeometryKinds(): GeometryKindSet | undefined;
    /**
     * Start with or continue with loading geometry. Called repeatedly until `isFinished` is `true`.
     */
    update(enabledKinds?: GeometryKindSet, disabledKinds?: GeometryKindSet): void;
    /**
     * Cancel geometry loading.
     */
    cancel(): void;
    /**
     * Dispose of any resources.
     */
    dispose(): void;
    /**
     * Reset the loader to its initial state and cancels any asynchronous work.
     * @remarks
     * This method prepares the loader to reload new geometry. Since the loader does not transition
     * to a final state, the promise returned by {@link TileGeometryLoader.waitFinished} is not
     * settled.
     */
    reset(): void;
    /**
     * Finish geometry loading.
     */
    finish(): void;
    private clear;
    private queueGeometryCreation;
    private createGeometry;
    private addStats;
    /**
     * Stores geometry kinds used to load decoded tile geometry.
     *
     * This values are stored to detect geometry kind changes during loading.
     *
     * @param enabledKinds - Set of geometry kinds to be displayed or undefined.
     * @param disabledKinds - Set of geometry kinds that won't be rendered.
     */
    private setGeometryKinds;
    /**
     * Compare enabled and disabled geometry kinds with currently set.
     *
     * Method compares input sets with recently used geometry kinds in performance wise
     * manner, taking special care of undefined and zero size sets.
     *
     * @param enabledKinds - Set of geometry kinds to be displayed or undefined.
     * @param disabledKinds - Set of geometry kinds that won't be rendered.
     * @return `true` only if sets are logically equal, meaning that undefined and empty sets
     * may result in same geometry (techniques kind) beeing rendered.
     */
    private compareGeometryKinds;
    /**
     * `True` if TileGeometryLoader was canceled
     */
    private get isCanceled();
    /**
     * `True` if TileGeometryLoader was disposed
     */
    private get isDisposed();
}

/**
 * The state the {@link ITileLoader}.
 */
declare enum TileLoaderState {
    Initialized = 0,
    Loading = 1,
    Loaded = 2,
    Decoding = 3,
    Ready = 4,
    Canceled = 5,
    Failed = 6
}
/**
 * The interface for managing tile loading.
 */
interface ITileLoader {
    /**
     * Current state of `TileLoader`.
     */
    state: TileLoaderState;
    /**
     * The result of decoding the `payload`: The [[DecodedTile]].
     */
    decodedTile?: DecodedTile;
    /**
     * `true` if [[Tile]] is still loading, `false` otherwise.
     */
    readonly isFinished: boolean;
    /**
     * Priority given to the tile loading task. The greater the number, the higher the priority.
     */
    priority: number;
    /**
     * Start loading and/or proceed through the various states of loading of this tile.
     *
     * @param client - Optional client requesting the load.
     * @returns A promise which resolves the [[TileLoaderState]].
     */
    loadAndDecode(client?: any): Promise<TileLoaderState>;
    /**
     * Return the current state in form of a promise. Caller can then wait for the promise to be
     * resolved.
     *
     * @returns A promise which resolves the current [[TileLoaderState]].
     */
    waitSettled(): Promise<TileLoaderState>;
    /**
     * Cancel loading of the [[Tile]].
     * Cancellation token is notified, an internal state is cleaned up.
     * @param client - Optional client requesting the cancelation. It's expected to match one of
     * the clients that previously called {@link ITileLoader.loadAndDecode}.
     */
    cancel(client?: any): void;
}

/**
 * This path in world coordinates is projected to screen space and blocks all other labels.
 *
 * It could be used for example:
 * - Border rejects labels.
 * - Route blocks street labels from being rendered underneath.
 *
 * Could potentially be expanded in future to have a priority, however for now, this isn't required.
 */
declare class PathBlockingElement {
    readonly points: Vector3Like[];
    /**
     * Note, [[screenSpaceLines]] is only used as a performance improvement and contains no
     * useful information. They are used to contain the screen space coordinates of the
     * points. By allocating the space here, we avoid per frame allocations, see
     * [[TextElementsRenderer.prepopulateScreenWithBlockingElements]].
     */
    readonly screenSpaceLines: THREE$1.Line3[];
    /**
     * Constructs a path from a list of points.
     * Pre allocates the [[screenSpaceLines]] used to render.
     * @param points - Points in world coordinates.
     */
    constructor(points: Vector3Like[]);
}

/**
 * Namespace containing useful information when dealing with Unicode's code points.
 */
declare namespace UnicodeUtils {
    /**
     * Range of Unicode code points considered as white space.
     * https://en.wikipedia.org/wiki/Whitespace_character
     */
    const whiteSpaceRanges: number[][];
    /**
     * Checks if a character should be considered as a white space.
     *
     * @param codePoint - Character's Unicode code point.
     *
     * @returns Result of the test.
     */
    function isWhiteSpace(codePoint: number): boolean;
    /**
     * Range of Unicode code points considered as `NewLine`.
     * https://en.wikipedia.org/wiki/Newline#Unicode
     */
    const newLineRanges: number[][];
    /**
     * Checks if a character should be considered as a new line.
     *
     * @param codePoint - Character's Unicode code point.
     *
     * @returns Result of the test.
     */
    function isNewLine(codePoint: number): boolean;
    /**
     * Range of Unicode code points considered as non-printable.
     * https://en.wikipedia.org/wiki/Unicode_control_characters
     */
    const nonPrintableRanges: number[][];
    /**
     * Checks if a character's can be printed (rendered).
     *
     * @param codePoint - Character's Unicode code point.
     *
     * @returns Result of the test.
     */
    function isPrintable(codePoint: number): boolean;
    /**
     * Unicode code point direction.
     */
    enum Direction {
        Neutral = 0,
        Weak = 0.5,
        LTR = 1,
        RTL = -1
    }
    /**
     * Unicode Blocks which have inherent RTL direction.
     * These blocks correspond to the scripts described here:
     * https://en.wikipedia.org/wiki/Right-to-left#List_of_RTL_scripts
     */
    const rtlBlocks: string[];
    /**
     * ASCII punctuation is considered to have neutral direction:
     * https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)#Table_of_characters
     */
    const neutralBidirectionalRanges: number[][];
    /**
     * Latin and arabic numerals are considered to have weak directionality:
     * https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)#Table_of_characters
     * https://en.wikipedia.org/wiki/Arabic_(Unicode_block)#Block
     */
    const weakBidirectionalRanges: number[][];
    /**
     * Returns the Unicode's character direction.
     *
     * @param codePoint - Character's Unicode code point.
     * @param block - Character's Unicode block.
     *
     * @returns Character's direction.
     */
    function getDirection(codePoint: number, block: string): Direction;
    /**
     * Some punctuation characters (like: (, ), <, >, [,], {, }) need to be mirrored when rendering
     * a RTL string to preserve their intrinsic meaning.
     * https://en.wikipedia.org/wiki/Basic_Latin_(Unicode_block)#Table_of_characters
     */
    const rtlMirroredCodePoints: number[];
    /**
     * Checks if a character should be mirrored on an RTL run.
     *
     * @param codePoint - Character's Unicode code point.
     *
     * @returns Result of the test.
     */
    function isRtlMirrored(codePoint: number): boolean;
}

/**
 * Structure containing all the required information necessary to render a BMFont glyph using
 * [[TextCanvas]].
 */
declare class GlyphData {
    readonly codePoint: number;
    readonly block: string;
    readonly width: number;
    readonly height: number;
    readonly advanceX: number;
    readonly offsetX: number;
    readonly offsetY: number;
    readonly texture: THREE$1.Texture;
    readonly font: Font;
    readonly isReplacement: boolean;
    /**
     * Unicode character represented by this glyph.
     */
    readonly character: string;
    /**
     * Glyph' direction.
     */
    readonly direction: UnicodeUtils.Direction;
    /**
     * Array containing the positions for all corners of this glyph.
     */
    positions: THREE$1.Vector3[];
    /**
     * Array containing the source texture coordinates for all corners of this glyph.
     * Used to sample the original texture atlas pages.
     */
    sourceTextureCoordinates: THREE$1.Vector2[];
    /**
     * Array containing the dynamic texture coordinates for all corners of this glyph.
     * Used to sample the dynamic texture atlas page.
     */
    dynamicTextureCoordinates: THREE$1.Vector2[];
    /**
     * Source texture atlas' page copy index.
     */
    copyIndex: number;
    /**
     * Flag indicating if glyph can be currently rendered.
     */
    isInCache: boolean;
    /**
     * Creates a new `GlyphData` object.
     *
     * @param codePoint - Unicode code point.
     * @param block - Unicode block.
     * @param width - Glyph' width.
     * @param height - Glyph' height.
     * @param advanceX - Amount of pixel to move after placing this glyph.
     * @param offsetX - Horizontal offset from the glyph' origin.
     * @param offsetY - Vertical offset from the glyph' origin.
     * @param u0 - Glyph' left texture coordinate.
     * @param v0 - Glyph' bottom texture coordinate.
     * @param u1 - Glyph' right texture coordinate.
     * @param v1 - Glyph' top texture coordinate.
     * @param texture - Glyph' source texture atlas page.
     * @param font - Glyph' font.
     * @param isReplacement - `true` if glyph is a replacement for a missing glyph.
     *
     * @returns New `GlyphData`.
     */
    constructor(codePoint: number, block: string, width: number, height: number, advanceX: number, offsetX: number, offsetY: number, u0: number, v0: number, u1: number, v1: number, texture: THREE$1.Texture, font: Font, isReplacement?: boolean);
    /**
     * Clone this `GlyphData`.
     *
     * @returns Cloned `GlyphData`.
     */
    clone(): GlyphData;
}

/**
 * Unit of measurement used to specify a font's size.
 */
declare enum FontUnit {
    Em = 0,
    Pixel = 1,
    Point = 2,
    Percent = 3
}
/**
 * Pair of unit and size specifying a font's size.
 */
interface FontSize {
    unit: FontUnit;
    size: number;
    backgroundSize: number;
}
/**
 * Style to be used when rendering glyphs.
 */
declare enum FontStyle {
    Regular = 0,
    Bold = 1,
    Italic = 2,
    BoldItalic = 3
}
/**
 * Variant to be used when rendering.
 */
declare enum FontVariant {
    Regular = 0,
    AllCaps = 1,
    SmallCaps = 2
}
/**
 * Vertical alignment to be used when placing text.
 */
declare enum VerticalAlignment {
    Above = 0,
    Center = -0.5,
    Below = -1
}
/**
 * Horizontal alignment to be used when placing text.
 */
declare enum HorizontalAlignment {
    Left = 0,
    Center = -0.5,
    Right = -1
}
/**
 * Vertical position of text area relative to the placement context (point, line).
 */
declare enum VerticalPlacement {
    Top = 0,
    Center = -0.5,
    Bottom = -1
}
/**
 * Horizontal position of text element relative to the placement context (point, line).
 *
 * @note [[HorizontalPlacement]] value is exactly opposite to [[HorizontalAlignment]] value,
 * cause when you place text on the right side of point (or icon) it will be left-aligned.
 */
declare enum HorizontalPlacement {
    Left = -1,
    Center = -0.5,
    Right = 0
}
interface TextPlacement {
    v: VerticalPlacement;
    h: HorizontalPlacement;
}
declare type TextPlacements = TextPlacement[];
/**
 * Text wrapping rule used when `lineWidth` is reached.
 */
declare enum WrappingMode {
    None = 0,
    Character = 1,
    Word = 2
}
/**
 * [[TextCanvas]] text rendering parameters.
 */
interface TextRenderParameters {
    fontName?: string;
    fontSize?: FontSize;
    fontStyle?: FontStyle;
    fontVariant?: FontVariant;
    rotation?: number;
    color?: THREE$1.Color;
    backgroundColor?: THREE$1.Color;
    opacity?: number;
    backgroundOpacity?: number;
}
/**
 * [[TextCanvas]] text rendering style.
 */
declare class TextRenderStyle {
    private m_params;
    /**
     * Creates a new `TextRenderStyle`.
     *
     * @param params - Input [[TextRenderParameters]].
     *
     * @returns New `TextRenderStyle`.
     */
    constructor(params?: TextRenderParameters);
    /**
     * Current [[TextRenderParameters]] for this style.
     */
    get params(): TextRenderParameters;
    set params(value: TextRenderParameters);
    /**
     * Name of the preferred [[Font]] to be used when rendering.
     */
    get fontName(): string;
    set fontName(value: string);
    /**
     * Collection of unit and sizes to apply for the currently active [[Font]].
     */
    get fontSize(): FontSize;
    set fontSize(value: FontSize);
    /**
     * Glyph style to apply for the currently active [[Font]].
     */
    get fontStyle(): FontStyle;
    set fontStyle(value: FontStyle);
    /**
     * Glyph variant to apply for the currently active [[Font]].
     */
    get fontVariant(): FontVariant;
    set fontVariant(value: FontVariant);
    /**
     * Glyph local rotation (radians).
     */
    get rotation(): number;
    set rotation(value: number);
    /**
     * Glyph color.
     */
    get color(): THREE$1.Color;
    set color(value: THREE$1.Color);
    /**
     * Glyph background color.
     */
    get backgroundColor(): THREE$1.Color;
    set backgroundColor(value: THREE$1.Color);
    /**
     * Glyph opacity.
     */
    get opacity(): number;
    set opacity(value: number);
    /**
     * Glyph background opacity.
     */
    get backgroundOpacity(): number;
    set backgroundOpacity(value: number);
    /**
     * Clone this [[TextRenderStyle]].
     *
     * @param params - Input [[TextRenderParameters]].
     *
     * @returns Cloned [[TextRenderStyle]].
     */
    clone(params?: TextRenderParameters): TextRenderStyle;
    /**
     * Copy other [[TextRenderStyle]] properties into this object instance.
     *
     * @param source - The source object to be copied.
     *
     * @returns reference to `this` object.
     */
    copy(source: TextRenderStyle): TextRenderStyle;
}
/**
 * [[TextCanvas]] text layout parameters.
 */
interface TextLayoutParameters {
    tracking?: number;
    leading?: number;
    maxLines?: number;
    lineWidth?: number;
    canvasRotation?: number;
    lineRotation?: number;
    wrappingMode?: WrappingMode;
    verticalAlignment?: VerticalAlignment;
    horizontalAlignment?: HorizontalAlignment;
    placements?: TextPlacements;
}
/**
 * [[TextCanvas]] text rendering style.
 */
declare class TextLayoutStyle {
    private m_params;
    /**
     * Creates a new `TextLayoutStyle`.
     *
     * @param params - Input [[TextLayoutParameters]].
     *
     * @returns New `TextLayoutStyle`.
     */
    constructor(params?: TextLayoutParameters);
    /**
     * Current [[TextLayoutParameters]] for this style.
     */
    get params(): TextLayoutParameters;
    set params(value: TextLayoutParameters);
    /**
     * Inter-glyph spacing (pixels). Scaled by [[FontSize]].
     */
    get tracking(): number;
    set tracking(value: number);
    /**
     * Inter-line spacing (pixels). Scaled by [[FontSize]].
     */
    get leading(): number;
    set leading(value: number);
    /**
     * Maximum number of lines to be considered when using [[TextCanvas]].
     */
    get maxLines(): number;
    set maxLines(value: number);
    /**
     * Maximum line width (pixels).
     */
    get lineWidth(): number;
    set lineWidth(value: number);
    /**
     * [[TextCanvas]] rotation (radians).
     */
    get canvasRotation(): number;
    set canvasRotation(value: number);
    /**
     * Line typesetting rotation (radians).
     */
    get lineRotation(): number;
    set lineRotation(value: number);
    /**
     * Wrapping (line-breaking) mode.
     */
    get wrappingMode(): WrappingMode;
    set wrappingMode(value: WrappingMode);
    /**
     * Text position regarding the baseline.
     */
    get verticalAlignment(): VerticalAlignment;
    set verticalAlignment(value: VerticalAlignment);
    /**
     * Text position inside a line.
     */
    get horizontalAlignment(): HorizontalAlignment;
    set horizontalAlignment(value: HorizontalAlignment);
    /**
     * Text placement options relative to label anchor (origin).
     *
     * @note [[TextPlacement]]s options may override alignment settings.
     */
    get placements(): TextPlacements;
    set placements(value: TextPlacements);
    /**
     * Clone this [[TextLayoutStyle]].
     *
     * @param params - Input [[TextLayoutParameters]].
     *
     * @returns Cloned [[TextLayoutStyle]].
     */
    clone(params?: TextLayoutParameters): TextLayoutStyle;
    /**
     * Copy other [[TextLayoutStyle]] properties into this object instance.
     *
     * @param other - The object to be copied.
     *
     * @returns reference to `this` object.
     */
    copy(other: TextLayoutStyle): TextLayoutStyle;
}

/**
 * Object containing vertex buffer data generated by [[TextCanvas]].
 */
declare class TextBufferObject {
    readonly glyphs: GlyphData[];
    readonly buffer: Float32Array;
    readonly bounds?: THREE$1.Box2 | undefined;
    readonly characterBounds?: THREE$1.Box2[] | undefined;
    readonly textRenderStyle?: TextRenderStyle | undefined;
    readonly textLayoutStyle?: TextLayoutStyle | undefined;
    /**
     * Constructs a new `TextBufferObject`.
     *
     * @param glyphs - Input glyphs.
     * @param buffer - Buffer containing the data generated by [[TextCanvas]].
     * @param bounds - Optional text bounds.
     * @param characterBounds - Optional character bounds.
     * @param textRenderStyle - [[TextRenderStyle]] applied by [[TextCanvas]].
     * @param textLayoutStyle - [[TextLayoutStyle]] applied by [[TextCanvas]].
     *
     * @returns New `TextBufferObject`.
     */
    constructor(glyphs: GlyphData[], buffer: Float32Array, bounds?: THREE$1.Box2 | undefined, characterBounds?: THREE$1.Box2[] | undefined, textRenderStyle?: TextRenderStyle | undefined, textLayoutStyle?: TextLayoutStyle | undefined);
}

/**
 * Procedural geometry that holds vertex attribute data for all glyphs in a [[TextCanvas]].
 */
declare class TextGeometry {
    readonly scene: THREE$1.Scene;
    /**
     * Count of currently drawn glyphs.
     */
    get drawCount(): number;
    /**
     * Mesh used to render foreground glyphs.
     */
    get mesh(): THREE$1.Mesh;
    /**
     * Mesh used to render background glyphs.
     */
    get backgroundMesh(): THREE$1.Mesh;
    /**
     * Maximum glyph capacity.
     */
    readonly capacity: number;
    private m_currentCapacity;
    private m_drawCount;
    private m_updateOffset;
    private m_vertexBuffer;
    private m_positionAttribute;
    private m_uvAttribute;
    private m_colorAttribute;
    private m_bgColorAttribute;
    private m_indexBuffer;
    private m_geometry;
    private m_mesh;
    private m_bgMesh;
    private m_pickingDataArray;
    /**
     * Creates a new `TextGeometry`.
     *
     * @param material - Material used to render foreground glyphs.
     * @param backgroundMaterial - Material used to render background glyphs.
     * @param initialSize - Initial amount of glyphs that can be stored.
     * @param capacity - Maximum glyph capacity.
     *
     * @returns New `TextGeometry`.
     */
    constructor(scene: THREE$1.Scene, material: THREE$1.Material, backgroundMaterial: THREE$1.Material, initialSize: number, capacity: number);
    /**
     * Release all allocated resources.
     */
    dispose(): void;
    /**
     * Clear the geometry.
     */
    clear(): void;
    /**
     * Update the GPU resources to reflect the latest additions to the geometry.
     */
    update(): void;
    /**
     * Add a new glyph to the `TextGeometry`.
     *
     * @param glyphData - [[GlyphData]] holding the glyph description.
     * @param corners - Transformed glyph corners.
     * @param weight - Foreground glyph sampling weight.
     * @param bgWeight - Foreground glyph sampling weight.
     * @param mirrored - If `true`, UVs will be horizontally mirrored (needed for RTL punctuation).
     * @param style - Currently set [[TextRenderStyle]].
     *
     * @returns Result of the addition.
     */
    add(glyphData: GlyphData, corners: THREE$1.Vector3[], weight: number, bgWeight: number, mirrored: boolean, style: TextRenderStyle): boolean;
    /**
     * Add a new glyph to a text buffer.
     *
     * @param buffer - Target buffer where glyph attributes will be stored.
     * @param offset - Offset of the target buffer.
     * @param glyphData - [[GlyphData]] holding the glyph description.
     * @param corners - Transformed glyph corners.
     * @param weight - Foreground glyph sampling weight.
     * @param bgWeight - Foreground glyph sampling weight.
     * @param mirrored - If `true`, UVs will be mirrored (needed for RTL punctuation).
     * @param style - Currently set [[TextRenderStyle]].
     */
    addToBuffer(buffer: Float32Array, offset: number, glyphData: GlyphData, corners: THREE$1.Vector3[], weight: number, bgWeight: number, mirrored: boolean, style: TextRenderStyle): void;
    /**
     * Add a previously computed [[TextBufferObject]] to the `TextGeometry`. Extra parameters can
     * be passed to override the passed attribute data.
     *
     * @param textBufferObject - [[TextBufferObject]] containing computed glyphs.
     * @param position - Override position value.
     * @param scale - Override scale value.
     * @param rotation - Override rotation value.
     * @param color - Override color value.
     * @param opacity - Override opacity value.
     * @param bgColor - Override background color value.
     * @param bgOpacity - Override background opacity value.
     *
     * @returns Result of the addition.
     */
    addTextBufferObject(textBufferObject: TextBufferObject, position?: THREE$1.Vector3, scale?: number, rotation?: number, color?: THREE$1.Color, opacity?: number, bgColor?: THREE$1.Color, bgOpacity?: number): boolean;
    /**
     * Adds picking data for glyphs from the specified start until the last glyph added.
     *
     * @param startIdx - First glyph index that this picking data is associated to.
     * @param endIdx - Last glyph index that this picking data is associated to.
     * @param pickingData - Picking data to be added.
     */
    addPickingData(startIdx: number, endIdx: number, pickingData: any): boolean;
    /**
     * Fill the picking results for the pixel with the given screen coordinate. If multiple glyphs
     * are found, the order of the results is unspecified.
     *
     * @param screenPosition - Screen coordinate of picking position.
     * @param pickCallback - Callback to be called for every picked element.
     */
    pick(screenPosition: THREE$1.Vector2, pickCallback: (pickData: any | undefined) => void): void;
    /**
     * Update the info with the memory footprint caused by objects owned by the `TextGeometry`.
     *
     * @param info - The info object to increment with the values from this `TextGeometry`.
     */
    updateMemoryUsage(info: MemoryUsage): void;
    private resizeBuffers;
}

/**
 * Optional parameters passed on [[TextCanvas]].`measureText` function call.
 */
interface MeasurementParameters {
    /**
     * Path where text should be placed on. Overrides the original position parameter.
     */
    path?: THREE$1.Path | THREE$1.CurvePath<THREE$1.Vector2>;
    /**
     * If `true`, text on a path will be placed even when its size its bigger than the path's size.
     */
    pathOverflow?: boolean;
    /**
     * Output per-character bounds.
     */
    outputCharacterBounds?: THREE$1.Box2[];
    /**
     * Array containing info on whether the glyphs are upper or lower case. Needed to support
     * `SmallCaps`.
     */
    letterCaseArray?: boolean[];
}
/**
 * Optional parameters passed on [[TextCanvas]].`addText` function call.
 */
interface AdditionParameters {
    /**
     * Path where text should be placed on. Overrides the original position parameter.
     */
    path?: THREE$1.Path | THREE$1.CurvePath<THREE$1.Vector2>;
    /**
     * If `true`, text on a path will be placed even when its size its bigger than the path's size.
     */
    pathOverflow?: boolean;
    /**
     * Layer where text will be added.
     */
    layer?: number;
    /**
     * If `true`, the input position parameter will be updated to contain the position of the last
     * glyph added.
     */
    updatePosition?: boolean;
    /**
     * Object containing additional data intended to be retrieved during picking.
     */
    pickingData?: any;
    /**
     * Array containing info on whether the glyphs are upper or lower case. Needed to support
     * `SmallCaps`.
     */
    letterCaseArray?: boolean[];
}
/**
 * Optional parameters passed on [[TextCanvas]].`createTextBufferObject` function call.
 */
interface TextBufferCreationParameters {
    /**
     * Path where text should be placed on. Overrides the original position parameter.
     */
    path?: THREE$1.Path | THREE$1.CurvePath<THREE$1.Vector2>;
    /**
     * If `true`, text on a path will be placed even when its size its bigger than the path's size.
     */
    pathOverflow?: boolean;
    /**
     * Output text bounding-box.
     */
    outputBounds?: boolean;
    /**
     * Output per-character bounds.
     */
    outputCharacterBounds?: boolean;
    /**
     * Array containing info on whether the glyphs are upper or lower case. Needed to support
     * `SmallCaps`.
     */
    letterCaseArray?: boolean[];
    /**
     * If `true`, both the [[TextRenderStyle]] and [[TextLayoutStyle]] used to generate the
     * [[TextBufferObject]] will be stored in it.
     */
    storeStyles?: boolean;
}
/**
 * Optional parameters passed on [[TextCanvas]].`addTextBufferObject` function call.
 */
interface TextBufferAdditionParameters {
    layer?: number;
    position?: THREE$1.Vector3;
    scale?: number;
    rotation?: number;
    color?: THREE$1.Color;
    opacity?: number;
    backgroundColor?: THREE$1.Color;
    backgroundOpacity?: number;
    pickingData?: any;
}
/**
 * [[TextCanvas]] rendering layer.
 */
interface TextCanvasLayer {
    id: number;
    storage: TextGeometry;
}
/**
 * [[TextCanvas]] construction parameters.
 */
interface TextCanvasParameters {
    /**
     * WebGLRenderer internally used by this `TextCanvas`.
     */
    renderer: THREE$1.WebGLRenderer;
    /**
     * Initial [[FontCatalog]].
     */
    fontCatalog: FontCatalog;
    /**
     * Minimum amount of glyphs each [[TextCanvas]] layer can store.
     */
    minGlyphCount: number;
    /**
     * Maximum amount of glyphs each [[TextCanvas]] layer can store.
     */
    maxGlyphCount: number;
    /**
     * Material used to render text.
     */
    material?: THREE$1.Material;
    /**
     * Material used to render text background.
     */
    backgroundMaterial?: THREE$1.Material;
    /**
     * Optional Canvas Name
     */
    name?: string;
}
/**
 * Describes estimated usage of memory on heap and GPU.
 */
interface MemoryUsage {
    heapSize: number;
    gpuSize: number;
}
/**
 * three.js text rendering engine which can manage and render high-quality, transformable, stylable
 * and properly layout SDF and MSDF text.
 */
declare class TextCanvas {
    private static readonly defaultTextRenderStyle;
    private static readonly defaultTextLayoutStyle;
    /**
     * Minimum amount of glyphs each [[TextCanvas]] layer can store.
     */
    readonly minGlyphCount: number;
    /**
     * Maximum amount of glyphs each [[TextCanvas]] layer can store.
     */
    readonly maxGlyphCount: number;
    readonly name?: string;
    private readonly m_renderer;
    private m_fontCatalog;
    private readonly m_currentTextRenderStyle;
    private readonly m_currentTextLayoutStyle;
    private m_material;
    private m_bgMaterial;
    private m_ownsMaterial;
    private m_ownsBgMaterial;
    private readonly m_defaultLayer;
    private readonly m_layers;
    private readonly m_lineTypesetter;
    private readonly m_pathTypesetter;
    /**
     * Constructs a new `TextCanvas`.
     *
     * @param params - `TextCanvas` construction parameters.
     *
     * @returns New `TextCanvas`.
     */
    constructor(params: TextCanvasParameters);
    /**
     * Currently active [[FontCatalog]].
     */
    get fontCatalog(): FontCatalog;
    set fontCatalog(value: FontCatalog);
    /**
     * Currently active text rendering material.
     */
    get material(): THREE$1.Material;
    set material(value: THREE$1.Material);
    /**
     * Currently active text background rendering material.
     */
    get backgroundMaterial(): THREE$1.Material;
    set backgroundMaterial(value: THREE$1.Material);
    /**
     * Currently active text rendering style.
     */
    get textRenderStyle(): TextRenderStyle;
    set textRenderStyle(style: TextRenderStyle);
    /**
     * Currently active text layout style.
     */
    get textLayoutStyle(): TextLayoutStyle;
    set textLayoutStyle(style: TextLayoutStyle);
    /**
     * Clears all the placed glyphs in this `TextCanvas` (as well as resetting the current style).
     */
    clear(): void;
    /**
     * Renders the content of this `TextCanvas`.
     *
     * @param camera - Orthographic camera.
     * @param lowerLayerId - Optional Id the first layer to be rendered has to be equal or above
     * @param higherLayerId - Optional Id the last layer to be rendered has to be below
     * @param target - Optional render target.
     * @param clear - Optional render target clear operation.
     */
    render(camera: THREE$1.OrthographicCamera, lowerLayerId?: number, higherLayerId?: number, target?: THREE$1.WebGLRenderTarget, clear?: boolean): void;
    /**
     * Creates a new `TextCanvas` rendering layer and returns. If there was already a layer for the
     * input `layerId`, it just returns this one instead.
     *
     * @param layerId - Desired layer identifier.
     *
     * @returns Created [[TextCanvasLayer]].
     */
    addLayer(layerId: number): TextCanvasLayer;
    /**
     * Retrieves a specific `TextCanvas` rendering layer.
     *
     * @param layerId - Desired layer identifier.
     *
     * @returns Selected [[TextCanvasLayer]].
     */
    getLayer(layerId: number): TextCanvasLayer | undefined;
    /**
     * Retrieves all `TextCanvas` rendering layers.
     *
     * @returns Array of [[TextCanvasLayer]]s.
     */
    getAllLayers(): TextCanvasLayer[];
    /**
     * Returns the computed bounding box for the input text. The current [[TextRenderStyle]] and
     * [[TextLayoutStyle]] will influence the results of this function.
     *
     * @param text - Input text. Provide an array of [[GlyphData]] for better performance.
     * @param outputBounds - Output text bounding box.
     * @param params - Optional measurement parameters.
     *
     * @returns Result of the measurement. If `false`, some error occurred during execution and the
     * input text couldn't be properly measured.
     */
    measureText(text: string | GlyphData[], outputBounds: THREE$1.Box2, params?: MeasurementParameters): boolean;
    /**
     * Adds the input text to this `TextCanvas` in the specified screen position. The current
     * [[TextRenderStyle]] and [[TextLayoutStyle]] will influence the results of this function.
     *
     * @param text - Input text. Provide an array of [[GlyphData]] for better performance.
     * @param position - Screen position.
     * @param params - Optional addition parameters.
     *
     * @returns Result of the addition. If `false`, some error occurred during execution and the
     * input text couldn't be properly added.
     */
    addText(text: string | GlyphData[], position: THREE$1.Vector3, params?: AdditionParameters): boolean;
    /**
     * Creates a new [[TextBufferObject]]. The computed text vertex buffer is equivalent to the
     * result of performing the `addText` function for the input text in the screen origin.
     *
     * @param text - Input text. Provide an array of [[GlyphData]] for better performance.
     * @param params - Optional creation parameters.
     *
     * @returns New [[TextBufferObject]] (or `undefined` if requested text glyphs couldn't be
     * retrieved from the current [[FontCatalog]]).
     */
    createTextBufferObject(text: string | GlyphData[], params?: TextBufferCreationParameters): TextBufferObject | undefined;
    /**
     * Adds a previously created [[TextBufferObject]] to the `TextCanvas`. Additional parameters can
     * be provided to override the attributes stored in the buffer.
     *
     * @param textBufferObject - [[TextBufferObject]] to add.
     * @param params - Optional addition parameters.
     *
     * @returns Result of the addition. If `false`, some error occurred during execution and the
     * input text couldn't be properly added.
     */
    addTextBufferObject(textBufferObject: TextBufferObject, params?: TextBufferAdditionParameters): boolean;
    /**
     * Executes the `pickCallback` for all previously stored picking data for text covering the
     * specified screen position.
     *
     * @param screenPosition - Screen coordinate of picking position.
     * @param pickCallback - Callback to be called for every picked element.
     */
    pickText(position: THREE$1.Vector2, callback: (pickData: any | undefined) => void): void;
    /**
     * Update the info with the memory footprint caused by objects owned by the `TextCanvas`.
     *
     * @param info - The info object to increment with the values from this `TextCanvas`.
     */
    getMemoryUsage(info: MemoryUsage): void;
    private placeText;
}

/**
 * Metrics defining the placement and rendering of all glyphs in a given [[Font]].
 */
interface FontMetrics {
    size: number;
    distanceRange: number;
    base: number;
    lineHeight: number;
    lineGap: number;
    capHeight: number;
    xHeight: number;
}
/**
 * Description of all assets, charset and metrics that define a font inside a [[FontCatalog]].
 */
interface Font {
    name: string;
    metrics: FontMetrics;
    charset: string;
    bold?: string;
    italic?: string;
    boldItalic?: string;
}
/**
 * Description of a continuous range of Unicode code points (as well as information on which fonts
 * supports it).
 */
interface UnicodeBlock {
    name: string;
    min: number;
    max: number;
    fonts: string[];
}
/**
 * Collection of font assets used to render glyphs when using a [[TextCanvas]].
 *
 * @summary A `FontCatalog` works as a stack of SDF bitmap fonts (using the BMFont format) designed
 * to cover the widest Unicode code point range possible. In order to manage all these assets
 * elegantly, the assets inside the `FontCatalog` are stored on a per-Unicode-Block basis, and
 * assets for a block are only loaded once a glyph belonging to that block is requested.
 *
 * Bitmap information coming from all different fonts is then stored in a unified WebGL GPU Texture
 * resource, which can be sampled to render all currently loaded glyphs.
 *
 */
declare class FontCatalog {
    readonly url: string;
    readonly name: string;
    readonly type: string;
    readonly size: number;
    readonly maxWidth: number;
    readonly maxHeight: number;
    readonly distanceRange: number;
    readonly fonts: Font[];
    readonly unicodeBlocks: UnicodeBlock[];
    readonly maxCodePointCount: number;
    private readonly m_replacementGlyph;
    /**
     * Loads a `FontCatalog`.
     *
     * @param url - Asset url.
     * @param maxCodePointCount - Maximum number of unique code points bitmaps this `FontCatalog`'s
     * internal texture can store simultaneously.
     *
     * @returns `FontCatalog` Promise.
     */
    static load(path: string, maxCodePointCount: number): Promise<FontCatalog>;
    static loadTexture(url: string): Promise<THREE$1.Texture>;
    static loadJSON(url: string): Promise<any>;
    private readonly m_glyphTextureCache;
    private readonly m_loadingJson;
    private readonly m_loadingPages;
    private readonly m_loadingGlyphs;
    private readonly m_loadedJson;
    private readonly m_loadedPages;
    private readonly m_loadedGlyphs;
    /** If `true`, a replacement glyph is returned for every missing glyph. */
    showReplacementGlyphs: boolean;
    /**
     * @hidden
     * Creates a new FontCatalog.
     *
     * @param url - FontCatalog's URL.
     * @param name - FontCatalog's name.
     * @param type - FontCatalog's type (sdf or msdf).
     * @param size - FontCatalog's glyph size (pixels).
     * @param maxWidth - FontCatalog's maximum glyph width (pixels).
     * @param maxHeight - FontCatalog's maximum glyph height (pixels).
     * @param distanceRange - Distance range used to generate the SDF bitmaps.
     * @param fonts - Array of supported fonts.
     * @param unicodeBlocks - Array of supported Unicode blocks.
     * @param maxCodePointCount - Maximum number of unique code points bitmaps this `FontCatalog`'s
     * internal texture can store simultaneously.
     * @param m_replacementGlyph - [[GlyphData]] to be used whenever a Unicode code point is not
     * supported by this `FontCatalog`.
     *
     * @returns New FontCatalog.
     */
    private constructor();
    /**
     * Release all allocated resources.
     */
    dispose(): void;
    /**
     * Removes all loaded (and loading) assets.
     */
    clear(): void;
    /**
     * Updates the internal WebGLRenderTarget.
     * The update will copy the newly introduced glyphs since the previous update.
     *
     * @param renderer - WebGLRenderer.
     */
    update(renderer: THREE$1.WebGLRenderer): void;
    /**
     * Internal WebGL Texture.
     */
    get texture(): THREE$1.Texture;
    /**
     * Internal WebGL Texture size.
     */
    get textureSize(): THREE$1.Vector2;
    /**
     * Current internal loading state.
     */
    get isLoading(): boolean;
    /**
     * Loads the description file for a specific [[UnicodeBlock]]. This speeds up consequent calls
     * to `FontCatalog`.loadCharset() that require glyphs from this block to be loaded.
     *
     * @param block - Requested [[UnicodeBlock]].
     * @param font - [[Font]] to retrieve this Unicode block from.
     * @param fontStyle - [[FontStyle]] assets to load.
     * @param loadPages - If `true`, all pages in this Unicode block will also be loaded.
     *
     * @returns Loaded Unicode Block json.
     */
    loadBlock(block: UnicodeBlock, font: Font, fontStyle: FontStyle, loadPages?: boolean): Promise<any>;
    /**
     * Releases the description file for a specific [[UnicodeBlock]] (and all downloaded pages).
     * Safe to call when no assets for this block have been loaded.
     *
     * @param block - Requested [[UnicodeBlock]].
     * @param font - [[Font]] to remove this Unicode block from.
     * @param fontStyle - [[FontStyle]] assets to remove.
     */
    removeBlock(block: UnicodeBlock, font: Font, fontStyle: FontStyle): void;
    /**
     * Loads all the required glyphs needed to render the input text. Character repetition will not
     * be considered, and only styled assets (with applied font selection, style and variants) will
     * be loaded.
     *
     * @param input - Input text.
     * @param style - Specific [[TextRenderStyle]] for which glyphs will be loaded.
     *
     * @returns Promise containing an array of all loaded [[GlyphData]] for the input text.
     */
    loadCharset(input: string, style: TextRenderStyle): Promise<GlyphData[]>;
    /**
     * Retrieves the loaded [[GlyphData]] for a specific character.
     * Returns `undefined` if the assets for this glyph haven't been loaded yet.
     *
     * @param codePoint - Character's Unicode code point.
     * @param font - [[Font]] to get this glyph from.
     * @param fontStyle - Specific [[FontStyle]] to get glyphs for.
     *
     * @returns [[GlyphData]] for this code point.
     */
    getGlyph(codePoint: number, font: Font, fontStyle: FontStyle): GlyphData | undefined;
    /**
     * Retrieves the loaded [[GlyphData]] for the specified text.
     * Returns `undefined` if the assets for these glyphs haven't been loaded yet.
     *
     * @param input - Input text.
     * @param style - Specific [[TextRenderStyle]] to get glyphs for.
     * @param letterCaseArray - Array containing the original letter case for the requested glyphs.
     *
     * @returns Array containing [[GlyphData]] for each character of the input text.
     */
    getGlyphs(input: string, style: TextRenderStyle, letterCaseArray?: boolean[]): GlyphData[] | undefined;
    /**
     * Gets the best matched font for a specific character.
     *
     * @param codePoint - Character's Unicode code point.
     * @param fontName - Font name suggestion.
     *
     * @returns Best matched font.
     */
    getFont(codePoint: number, fontName?: string): Font;
    /**
     * Update the info with the memory footprint caused by objects owned by the `FontCatalog`.
     *
     * @param info - The info object to increment with the values from this `FontCatalog`.
     */
    updateMemoryUsage(info: MemoryUsage): void;
    private createReplacementGlyph;
    private loadAssets;
    private loadPage;
    private getAssetsPath;
}

/** Any type supported by WebGLRenderingContext.texImage2D() for texture creation */
declare type TexturizableImage = HTMLImageElement | HTMLCanvasElement | HTMLVideoElement | ImageData | ImageBitmap;
/**
 * `ImageItem` is used to identify an image in the {@link ImageCache}.
 */
declare class ImageItem {
    readonly url: string;
    image?: TexturizableImage | undefined;
    /** Mip maps for image data */
    mipMaps?: ImageData[];
    /** Turns to `true` if the loading has been cancelled. */
    cancelled?: boolean;
    /** `loadingPromise` is only used during loading/generating the image. */
    private loadingPromise?;
    /**
     * Create the `ImageItem`.
     *
     * @param url - URL of the image, or unique identifier.
     * @param image - Optional image if already loaded.
     */
    constructor(url: string, image?: TexturizableImage | undefined);
    get loaded(): boolean;
    get loading(): boolean;
    /**
     * Load an {@link ImageItem}.
     *
     * @remarks
     * If the loading process is already running, it returns the current promise.
     *
     * @param imageItem - `ImageItem` containing the URL to load image from.
     * @returns An {@link ImageItem} if the image has already been loaded, a promise otherwise.
     */
    loadImage(): Promise<ImageItem | undefined>;
    private finalizeImage;
}

/**
 * Parameters to customize behaviour of {@link (MapView.intersectMapObjects)}.
 */
interface IntersectParams {
    /**
     * The maximum number of results to be retrieved from the intersection test. If set, only the
     * first maxResultCount results will be returned, following an order by distance first, then
     * by reversed render order (topmost/highest render order first).
     */
    maxResultCount?: number;
}

/**
 * Describes the general type of a picked object.
 */
declare enum PickObjectType {
    /**
     * Unspecified.
     */
    Unspecified = 0,
    /**
     * A point object.
     */
    Point = 1,
    /**
     * A line object.
     */
    Line = 2,
    /**
     * An area object.
     */
    Area = 3,
    /**
     * The text part of a {@link TextElement}
     */
    Text = 4,
    /**
     * The Icon of a {@link TextElement}.
     */
    Icon = 5,
    /**
     * Any general 3D object, for example, a landmark.
     */
    Object3D = 6
}
/**
 * A general pick result. You can access the details of a picked geometry from the property
 * `intersection`, which is available if a geometry was hit. If a road was hit, a [[RoadPickResult]]
 * is returned, which has additional information, but no `intersection`.
 */
interface PickResult {
    /**
     * General type of object.
     */
    type: PickObjectType;
    /**
     * A 2D point in screen coordinates, or a 3D point in world coordinates.
     */
    point: THREE$1.Vector2 | THREE$1.Vector3;
    /**
     * Distance from the camera to the picking point; used to determine the closest object.
     */
    distance: number;
    /**
     * Uniquely identifies the data source which provided the picked object.
     */
    dataSourceName: string | undefined;
    /**
     * Data source order, useful for sorting a collection of picking results.
     * A number for objects/features coming from tiles (as those have data sources attached),
     * an undefined when objects are added via "mapView.mapAnchors.add(object)" - those are treated as
     * base layer objects during picking (same as "dataSourceOrder: 0").
     */
    dataSourceOrder: number | undefined;
    /**
     * Render order of the intersected object.
     */
    renderOrder?: number;
    /**
     * An optional feature ID of the picked object.
     * @remarks The ID may be assigned by the object's {@link DataSource}, for example in case of
     * Optimized Map Vector (OMV) and GeoJSON data sources.
     */
    featureId?: number | string;
    /**
     * Defined for geometry only.
     */
    intersection?: THREE$1.Intersection;
    /**
     * Defined for roads or if `enableTechniqueInfo` option is enabled.
     */
    technique?: Technique;
    /**
     * Optional user data that has been defined in the picked object.
     *
     * @remarks
     * This object points directly to
     * information contained in the original {@link TileFeatureData}
     * stored in {@link MapView}, and should
     * not be modified.
     */
    userData?: any;
    /**
     * The tile key containing the picked object.
     */
    tileKey?: TileKey;
}
/**
 * Handles the picking of scene geometry and roads.
 * @internal
 */
declare class PickHandler {
    readonly mapView: MapView;
    readonly camera: THREE$1.Camera;
    enablePickTechnique: boolean;
    private readonly m_pickingRaycaster;
    constructor(mapView: MapView, camera: THREE$1.Camera, enablePickTechnique?: boolean);
    /**
     * Does a raycast on all objects in the scene; useful for picking.
     *
     * @param x - The X position in CSS/client coordinates, without the applied display ratio.
     * @param y - The Y position in CSS/client coordinates, without the applied display ratio.
     * @param parameters - The intersection test behaviour may be adjusted by providing an instance
     * of {@link IntersectParams}.
     * @returns the list of intersection results.
     */
    intersectMapObjects(x: number, y: number, parameters?: IntersectParams): PickResult[];
    /**
     * Returns a ray caster using the supplied screen positions.
     *
     * @param x - The X position in css/client coordinates (without applied display ratio).
     * @param y - The Y position in css/client coordinates (without applied display ratio).
     *
     * @return Raycaster with origin at the camera and direction based on the supplied x / y screen
     * points.
     */
    raycasterFromScreenPoint(x: number, y: number): THREE$1.Raycaster;
    private createResult;
    private getIntersectedTiles;
    private addObjInfo;
    private setupRaycaster;
}

/**
 * Cache images wrapped into {@link ImageItem}s for a {@link MapView}.
 *
 * @remarks
 * An image may have multiple names in a theme, the `MapViewImageCache` maps different names to the
 * same image URL, and allows to share the image by URL to different MapViews.
 * Within a MapView instance, the (optional) name is unique, so registering multiple images with the
 * same name is invalid.
 *
 * The `MapViewImageCache` uses a global {@link ImageCache} to actually store (and generate) the
 * image data.
 */
declare class MapViewImageCache {
    private readonly m_name2Url;
    private readonly m_urlNameCount;
    /**
     * Add an image from an URL and optionally start loading it, storing the resulting
     * {@link TexturizableImage} in a {@link ImageItem}.
     *
     * @remarks
     * Names are unique within a {@link MapView}. URLs are not unique, multiple images with
     * different names can have the same URL. Still, URLs are are loaded only once.
     * If an image with the same name is already registered an error is thrown.
     *
     * @param name - Image name.
     * @param url - Image URL.
     * @param startLoading - Optional. Pass `true` to start loading the image in the background.
     * @returns The resulting {@link ImageItem} or a promise for it if it starts loading.
     */
    addImage(name: string, url: string, startLoading?: boolean): ImageItem | Promise<ImageItem | undefined>;
    /**
     * Add an image storing it in a {@link ImageItem}.
     *
     * @remarks
     * Names are unique within a {@link MapView}. If an image with the same name is already
     * registered an error is thrown.
     *
     * @param name - Unique image name.
     * @param image - The image to add.
     * @returns The resulting {@link ImageItem}
     */
    addImage(name: string, image: TexturizableImage): ImageItem;
    /**
     * Remove the image with this name from the cache.
     *
     * @param name - Name of the image.
     * @returns `true` if item has been removed.
     */
    removeImage(name: string): boolean;
    /**
     * Find {@link ImageItem} by its name.
     *
     * @param name - Name of image.
     */
    findImageByName(name: string): ImageItem | undefined;
    /**
     * Remove all {@link ImageItem}s from the cache.
     *
     * @remarks
     * Also removes all {@link ImageItem}s that belong to this
     * {@link MapView} from the global {@link ImageCache}.
     * @returns Number of images removed.
     */
    clear(): void;
    /**
     * Register an existing image by name. If the name already exists and error is thrown.
     *
     * @param name - Image name.
     * @param url - Optional image URL.
     * @param image - Optional {@link TexturizableImage}.
     */
    private registerImage;
    private hasName;
}

interface IBox {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
}
declare class CollisionBox extends Math2D.Box implements IBox {
    constructor(box?: Math2D.Box | THREE$1.Box2 | IBox);
    copy(box: Math2D.Box | THREE$1.Box2 | IBox): CollisionBox;
    get minX(): number;
    set minX(minX: number);
    get maxX(): number;
    set maxX(maxX: number);
    get minY(): number;
    set minY(minY: number);
    get maxY(): number;
    set maxY(maxY: number);
}
/**
 * Collision box with additional boxes defining tighter bounds for the enclosed feature
 * (e.g.glyph bounds for text).
 */
declare class DetailedCollisionBox extends CollisionBox {
    readonly detailBoxes: CollisionBox[];
    constructor(box: Math2D.Box | THREE$1.Box2 | IBox, detailBoxes: CollisionBox[]);
}
declare class ScreenCollisions {
    /** The screen bounding box. */
    readonly screenBounds: Math2D.Box;
    /** Tree of allocated bounds. */
    private readonly rtree;
    /**
     * Constructs a new ScreenCollisions object.
     */
    constructor();
    /**
     * Resets the list of allocated screen bounds.
     */
    reset(): void;
    /**
     * Updates the screen bounds that are used to check if bounding boxes are visible.
     *
     * @param width - The width of the container.
     * @param height - The height of the container.
     */
    update(width: number, height: number): void;
    /**
     * Marks the region of the screen intersecting with the given bounding box as allocated.
     *
     * @param bounds - The bounding box in NDC scaled coordinates (i.e. top left is -width/2,
     * -height/2)
     */
    allocate(bounds: Math2D.Box | CollisionBox | DetailedCollisionBox): void;
    /**
     * Inserts the given bounds into the rtree.
     *
     * @param bounds - The bounding boxes (the bounding boxes must be in the space returned from the
     * ScreenProjector.project method).
     */
    allocateIBoxes(bounds: IBox[]): void;
    /**
     * Search for all bounds in the tree intersecting with the given box.
     * @param box - The box used for the search.
     * @returns An array of all IBoxes intersecting with the given box.
     */
    search(box: CollisionBox): IBox[];
    /**
     * Checks if the given bounding box is already allocated.
     *
     * @param bounds - The bounding box in world coordinates.
     */
    isAllocated(bounds: Math2D.Box | CollisionBox): boolean;
    /**
     * Checks if the given screen bounds intersects with the frustum of the active camera.
     *
     * @param bounds - The bounding box in world coordinates.
     */
    isVisible(bounds: Math2D.Box): boolean;
    /**
     * Checks if the given screen bounds is contained within the frustum of the active camera.
     *
     * @param bounds - The bounding box in world coordinates.
     */
    isFullyVisible(bounds: Math2D.Box): boolean;
    /**
     * Test whether a given [[CollisionBox]] intersects with any of the details in the specified
     * [[IBox]]es.
     *
     * @param testBox - The box to test for intersection.
     * @param boxes - The candidate boxes the test box may intersect with. It's assumed that the
     * global bounds of these boxes intersect with the given test box.
     * @returns `true` if any intersection found.
     */
    intersectsDetails(testBox: CollisionBox, boxes: IBox[]): boolean;
    /**
     * Computes the intersection between the supplied CollisionBox and the LineWithBound.
     * @note The [[CollisionBox]] is in Screen Bounds space, whereas the line must be
     * in Screen Coordinate space
     */
    private intersectsLine;
}

/**
 * Declares an interface for a `struct` containing a [[BoxBuffer]]'s attribute state information.
 */
interface State {
    positionAttributeCount: number;
    colorAttributeCount: number;
    uvAttributeCount: number;
    indexAttributeCount: number;
    pickInfoCount: number;
}
/**
 * SubClass of [[THREE.Mesh]] to identify meshes that have been created by [[BoxBuffer]] and
 * [[TextBuffer]]. Add the isEmpty flag to quickly test for empty meshes.
 */
declare class BoxBufferMesh extends THREE$1.Mesh {
    constructor(geometry: THREE$1.BufferGeometry, material: THREE$1.Material | THREE$1.Material[]);
    /**
     * A mesh that has no positions and indices set is defined to be empty.
     *
     * @returns `True` if no indices have been added to the mesh.
     */
    get isEmpty(): boolean;
}
/**
 * Buffer for (untransformed) `Box2` objects. Can be used to create a single geometry for screen-
 * aligned boxes, like POIs.
 */
declare class BoxBuffer {
    private readonly m_material;
    private readonly m_renderOrder;
    private readonly m_maxElementCount;
    /**
     * {@link @arcadecity/arcade-map/datasource-protocol#BufferAttribute} holding the `BoxBuffer` position data.
     */
    private m_positionAttribute?;
    /**
     * {@link @arcadecity/arcade-map/datasource-protocol#BufferAttribute} holding the `BoxBuffer` color data.
     */
    private m_colorAttribute?;
    /**
     * {@link @arcadecity/arcade-map/datasource-protocol#BufferAttribute} holding the `BoxBuffer` uv data.
     */
    private m_uvAttribute?;
    /**
     * {@link @arcadecity/arcade-map/datasource-protocol#BufferAttribute} holding the `BoxBuffer` index data.
     */
    private m_indexAttribute?;
    private readonly m_pickInfos;
    /**
     * [[BufferGeometry]] holding all the different
     * {@link @arcadecity/arcade-map/datasource-protocol#BufferAttribute}s.
     */
    private m_geometry;
    /**
     * [[Mesh]] used for rendering.
     */
    private m_mesh;
    private m_size;
    /**
     * Creates a new `BoxBuffer`.
     *
     * @param m_material - Material to be used for [[Mesh]] of this `BoxBuffer`.
     * @param m_renderOrder - Optional renderOrder of this buffer.
     * @param startElementCount - Initial number of elements this `BoxBuffer` can hold.
     * @param m_maxElementCount - Maximum number of elements this `BoxBuffer` can hold.
     */
    constructor(m_material: THREE$1.Material | THREE$1.Material[], m_renderOrder?: number, startElementCount?: number, m_maxElementCount?: number);
    /**
     * Duplicate this `BoxBuffer` with same material and renderOrder.
     *
     * @returns A clone of this `BoxBuffer`.
     */
    clone(): BoxBuffer;
    /**
     * Dispose of the geometry.
     */
    dispose(): void;
    /**
     * Return the current number of elements the buffer can hold.
     */
    get size(): number;
    /**
     * Clear's the `BoxBuffer` attribute buffers.
     */
    reset(): void;
    /**
     * Returns `true` if this `BoxBuffer` can hold the specified amount of glyphs. If the buffer
     * can only add the glyph by increasing the buffer size, the resize() method is called, which
     * will then create a new geometry for the mesh.
     *
     * @param glyphCount - Number of glyphs to be added to the buffer.
     * @returns `true` if the element (box or glyph) can be added to the buffer, `false` otherwise.
     */
    canAddElements(glyphCount?: number): boolean;
    /**
     * Returns this `BoxBuffer`'s attribute [[State]].
     */
    saveState(): State;
    /**
     * Store this `BoxBuffer`'s attribute [[State]] to a previously stored one.
     *
     * @param state - [[State]] struct describing a previous attribute state.
     */
    restoreState(state: State): void;
    /**
     * Adds a new box to this `BoxBuffer`.
     *
     * @param screenBox - [[Math2D.Box]] holding screen coordinates for this box.
     * @param uvBox - [[Math2D.UvBox]] holding uv coordinates for this box.
     * @param color - Box's color.
     * @param opacity - Box's opacity.
     * @param distance - Box's distance to camera.
     * @param pickInfo - Box's picking information.
     */
    addBox(screenBox: Math2D.Box, uvBox: Math2D.UvBox, color: THREE$1.Color, opacity: number, distance: number, pickInfo?: any): boolean;
    /**
     * Updates a [[BufferGeometry]] object to reflect the changes in this `TextBuffer`'s attribute
     * data.
     */
    updateBufferGeometry(): void;
    /**
     * Check if the buffer is empty. If it is empty, the memory usage is minimized to reduce
     * footprint.
     */
    cleanUp(): void;
    /**
     * Determine if the mesh is empty.
     */
    get isEmpty(): boolean;
    /**
     * Get the [[Mesh]] object. The geometry instance of the mesh may change if the buffers are
     * resized. The mesh, once created, will not change, so it can always be added to the scene.
     */
    get mesh(): BoxBufferMesh;
    /**
     * Fill the picking results for the pixel with the given screen coordinate. If multiple
     * boxes are found, the order of the results is unspecified.
     *
     * @param screenPosition - Screen coordinate of picking position.
     * @param pickCallback - Callback to be called for every picked element.
     * @param image - Image to test if the pixel is transparent
     */
    pickBoxes(screenPosition: THREE$1.Vector2, pickCallback: (pickData: any | undefined) => void, image?: CanvasImageSource | ImageData): void;
    /**
     * Creates a new {@link @arcadecity/arcade-map/datasource-protocol#Geometry} object
     * from all the attribute data stored in this `BoxBuffer`.
     *
     * @remarks
     * The [[Mesh]] object may be created if it is not initialized already.
     *
     * @param newSize - Optional number of elements to resize the buffer to.
     * @param forceResize - Optional flag to force a resize even if new size is smaller than before.
     */
    resize(newSize?: number, forceResize?: boolean): BoxBufferMesh;
    /**
     * Update the info with the memory footprint caused by objects owned by the `BoxBuffer`.
     *
     * @param info - The info object to increment with the values from this `BoxBuffer`.
     */
    updateMemoryUsage(info: MemoryUsage): void;
    /**
     * Check if a pixel is transparent or not.
     *
     * @param image - Image source.
     * @param xScreenPos - X position of the pixel.
     * @param yScreenPos - Y position of the pixel.
     * @param box - Bounding box of the image in screen coordinates.
     * @param uvBox - Uv box referred to the given bounding box.
     * @param canvas - Canvas element to draw the image if it's not a `ImageData` object.
     */
    private isPixelTransparent;
    /**
     * Remove current attributes and arrays. Minimizes memory footprint.
     */
    private clearAttributes;
    /**
     * Resize the attribute buffers. New value must be larger than the previous one.
     *
     * @param newSize - New number of elements in the buffer. Number has to be larger than the
     *      previous size.
     */
    private resizeBuffer;
}

/**
 * POI manager class, responsible for loading the
 * {@link @arcadecity/arcade-map/datasource-protocol#PoiGeometry} objects
 * from the {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile},
 * and preparing them for rendering.
 *
 * @remarks
 * Also loads and manages the texture atlases for the icons.
 */
declare class PoiManager {
    readonly mapView: MapView;
    private static readonly m_missingPoiTableName;
    private static readonly m_missingPoiName;
    /**
     * Warn about a missing POI table name, but only once.
     * @param poiTableName - POI mapping table name.
     * @param poiTable - POI table instance.
     */
    private static notifyMissingPoiTable;
    /**
     * Warn about a missing POI name, but only once.
     * @param poiName - name of POI.
     * @param poiTableName - POI mapping table name.
     */
    private static notifyMissingPoi;
    private readonly m_imageTextures;
    private readonly m_poiShieldGroups;
    /**
     * The constructor of the `PoiManager`.
     *
     * @param mapView - The {@link MapView} instance that should display the POIs.
     */
    constructor(mapView: MapView);
    /**
     * Add all POIs from a decoded tile and store them as {@link TextElement}s in the {@link Tile}.
     *
     * Also handles LineMarkers, which is a recurring marker along a line (road).
     *
     * @param tile - Tile to add POIs to.
     * @param decodedTile - DecodedTile containing the raw
     *                      {@link @arcadecity/arcade-map/datasource-protocol#PoiGeometry}
     *                      objects describing the POIs.
     */
    addPois(tile: Tile, decodedTile: DecodedTile): void;
    /**
     * Load the texture atlas that defines the segments of the texture that should be used for
     * specific icons.
     *
     * @remarks
     * Creates an {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture}
     * for every element in the atlas, such that it can
     * be addressed in the theme file.
     *
     * @param imageName - Name of the image from the theme (NOT the url!).
     * @param atlas - URL of the JSON file defining the texture atlas.
     * @param abortSignal - Signal to Abort the loading of the Atlas Image
     */
    addTextureAtlas(imageName: string, atlas: string, abortSignal?: AbortSignal): Promise<void>;
    /**
     * Add an {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture} such that it
     * is available as a named entity for techniques in theme files.
     *
     * @param imageTexture - {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture}
     *                       that should be available for POIs.
     */
    addImageTexture(imageTexture: ImageTexture): void;
    /**
     * Return the {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture}
     * registered under the specified name.
     *
     * @param name - Name of the {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture}.
     */
    getImageTexture(name: string): ImageTexture | undefined;
    /**
     * Update the {@link TextElement} with the information taken from the {@link PoiTable} which is
     * referenced in the {@link PoiInfo} of the pointLabel.
     *
     * If the requested {@link PoiTable} is not available yet, the function returns `false`.
     * If the {@link PoiTable} is not defined, or if the references POI has no entry in
     * the {@link PoiTable}, no action is taken, and the function returns `false`.
     *
     * If the {@link PoiTable} has been processed, it returns `true`, indicating that this function
     * doesn't have to be called again.
     *
     * @param pointLabel - The {@link TextElement} to update.
     *
     * @returns `true` if the {@link PoiTable} has been processed, and the
     *          function does not have to be called again.
     */
    updatePoiFromPoiTable(pointLabel: TextElement): boolean;
    /**
     * Clear internal state. Applicable when switching themes.
     */
    clear(): void;
    /**
     * Add the LineMarker as a POI with multiple positions sharing the same `shieldGroupIndex`.
     */
    private addLineMarker;
    /**
     * Create and add POI {@link TextElement}s to tile with a series of positions.
     */
    private addPoi;
}

interface PoiLayer {
    id: number;
    scene: THREE$1.Scene;
}
/**
 * @internal
 * Buffer for POIs sharing same material and render order, renderable in a single draw call
 * (WebGL limits apply, see {@link BoxBuffer}).
 */
declare class PoiBuffer {
    readonly buffer: BoxBuffer;
    readonly layer: PoiLayer;
    private readonly m_onDispose;
    private m_refCount;
    /**
     * Creates a `PoiBuffer`
     * @param buffer -
     * @param layer - The {@link TextCanvas} layer used to render the POIs.
     */
    constructor(buffer: BoxBuffer, layer: PoiLayer, m_onDispose: () => void);
    /**
     * Increases this `PoiBuffer`'s reference count.
     * @returns this `PoiBuffer`.
     */
    increaseRefCount(): PoiBuffer;
    /**
     * Decreases this `PoiBuffer`'s reference count. All resources will be disposed when the
     * reference count reaches 0.
     * @returns this `PoiBuffer`.
     */
    decreaseRefCount(): PoiBuffer;
    private dispose;
}
/**
 * @internal
 * Manage POI rendering. Uses a [[PoiBatchRegistry]] to actually create the geometry that is being
 * rendered.
 */
declare class PoiRenderer {
    private readonly m_renderer;
    private readonly m_poiManager;
    private readonly m_imageCaches;
    /**
     * Compute screen box for icon. It is required that `prepareRender` has been successfully called
     * before `computeScreenBox` may be called.
     *
     * @param poiInfo - PoiInfo containing information for rendering the POI icon.
     * @param screenPosition - Position on screen (2D).
     * @param scale - Scale to apply to icon.
     * @param env - Current zoom level.
     * @param screenBox - Box that will be used to store the result.
     * @returns The computed screen box for the icon.
     */
    static computeIconScreenBox(poiInfo: PoiInfo, screenPosition: THREE$1.Vector2, scale: number, env: Env, screenBox?: Math2D.Box): Math2D.Box;
    private readonly m_poiBatchRegistry;
    private readonly m_tempScreenBox;
    private readonly m_layers;
    /**
     * Create the `PoiRenderer` for the specified {@link MapView}.
     *
     * @param m_renderer - The {@link THREE.WebGLRenderer} to be rendered to.
     * @param m_poiManager - The {@link PoiManager} to be used.
     * @param m_imageCaches - The {@link ImageCache}s to look for loaded images.
     */
    constructor(m_renderer: THREE$1.WebGLRenderer, m_poiManager: PoiManager, m_imageCaches: MapViewImageCache[]);
    get renderer(): THREE$1.WebGLRenderer;
    /**
     * Prepare the POI for rendering, and determine which {@link PoiBuffer} should be used. If a
     * {@link PoiBuffer} is assigned, the POI is ready to be rendered.
     *
     * @param pointLabel - TextElement with PoiInfo for rendering the POI icon.
     * @param env - TODO! The current zoomLevel level of {@link MapView}
     *
     * @returns `True` if the space is not already allocated by another object (text label or POI)
     */
    prepareRender(pointLabel: TextElement, env: Env): boolean;
    /**
     * Reset all batches, removing all content from the [[PoiBatchRegistry]]. Called at the
     * beginning of a frame before the POIs are placed.
     */
    reset(): void;
    /**
     * Add the icon. Icon will only be added if opacity > 0, otherwise only its space will be
     * allocated.
     *
     * @param poiInfo - PoiInfo containing information for rendering the POI icon.
     * @param screenPosition - Position on screen (2D):
     * @param screenCollisions - Object handling the collision checks for screen-aligned 2D boxes.
     * @param viewDistance - Box's distance to camera.
     * @param scale - Scaling factor to apply to text and icon.
     * @param allocateScreenSpace - If `true` screen space will be allocated for the icon.
     * @param opacity - Opacity of icon to allow fade in/out.
     * @returns - `true` if icon has been actually rendered, `false` otherwise.
     */
    addPoi(poiInfo: PoiInfo, screenPosition: THREE$1.Vector2, screenCollisions: ScreenCollisions, viewDistance: number, scale: number, allocateScreenSpace: boolean, opacity: number, env: Env): void;
    /**
     * Update the geometry of all [[PoiBatch]]es. Called before rendering.
     */
    update(): void;
    /**
     * @internal
     *
     * Adds a layer to the PoiRenderer
     * @param layerId
     */
    addLayer(layerId: number): PoiLayer;
    /**
     * Retrieves a specific `Poi` rendering layer.
     *
     * @param layerId - Desired layer identifier.
     *
     * @returns Selected {@link PoiLayer}
     */
    private getLayer;
    /**
     * @internal
     *
     * Returns all {@link PoiLayer}s of this {@link PoiRenderer}
     */
    get layers(): PoiLayer[];
    /**
     * Renders the content of this `PoiRenderer`.
     *
     * @param camera - Orthographic camera.
     * @param layer - The Layer to be rendered.
     */
    render(camera: THREE$1.OrthographicCamera, layer: PoiLayer): void;
    /**
     * Fill the picking results for the pixel with the given screen coordinate. If multiple
     * {@link PoiInfo}s are found, the order of the results is unspecified.
     *
     * @param screenPosition - Screen coordinate of picking position.
     * @param pickCallback - Callback to be called for every picked element.
     */
    pickTextElements(screenPosition: THREE$1.Vector2, pickCallback: (pickData: any | undefined) => void): void;
    /**
     * Update the info with the memory footprint caused by objects owned by the `PoiRenderer`.
     *
     * @param info - The info object to increment with the values from this `PoiRenderer`.
     */
    getMemoryUsage(info: MemoryUsage): void;
    /**
     * Register the POI at the [[PoiBatchRegistry]] which may require some setup, for example
     * loading of the actual image.
     */
    private preparePoi;
    /**
     * Setup texture and material for the batch.
     *
     * @param poiInfo - {@link PoiInfo} to initialize.
     * @param imageTexture - Shared {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture},
     *                       defines used area in atlas.
     * @param imageItem - Shared {@link ImageItem}, contains cached image for texture.
     * @param env - The current zoom level of {@link MapView}
     */
    private setupPoiInfo;
}

/**
 * Types of text elements.
 */
declare enum TextElementType {
    PoiLabel = 0,
    PathLabel = 1,
    LineMarker = 2
}

/**
 * Additional information for an icon that is to be rendered along with a {@link TextElement}.
 * @internal
 */
interface PoiInfo {
    /**
     * Technique defining the POI or LineMarker
     */
    technique: PoiTechnique | LineMarkerTechnique;
    /**
     * Name of the {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture} or image in
     * {@link @arcadecity/arcade-map/mapview#userImageCache}.
     */
    imageTextureName?: string;
    /**
     * Icon color override
     *
     * @see {@link @arcadecity/arcade-map/datasource-protocol#MarkerTechniqueParams.iconColor};
     */
    iconColor?: THREE$1.Color;
    /**
     * Icon brightness.
     *
     * @see {@link @arcadecity/arcade-map/datasource-protocol#MarkerTechniqueParams.iconBrightness};
     */
    iconBrightness?: number;
    /**
     * Name of the POI table {@link PoiTable}.
     */
    poiTableName?: string;
    /**
     * Name of the POI description in the {@link PoiTable}.
     */
    poiName?: string;
    /**
     * Specify stack mode. Defaults to `ShowInStack`.
     */
    stackMode?: PoiStackMode;
    /**
     * Minimum zoomLevel at which to display the label icon. No default.
     */
    iconMinZoomLevel?: number;
    /**
     * Maximum zoomLevel at which to display the label icon. No default.
     */
    iconMaxZoomLevel?: number;
    /**
     * Minimum zoomLevel at which to display the label text. No default.
     */
    textMinZoomLevel?: number;
    /**
     * Maximum zoomLevel at which to display the label text. No default.
     */
    textMaxZoomLevel?: number;
    /**
     * If true, the text icon will appear even if the text part is blocked by other labels. Defaults
     * to `false`.
     */
    textIsOptional?: boolean;
    /**
     * If true, the text will appear even if the icon is blocked by other labels or if it cannot be
     * rendered because of missing icon graphics. Defaults to `false`.
     */
    iconIsOptional?: boolean;
    /**
     * If `true`, icon is allowed to overlap other labels or icons of lower priority.
     */
    mayOverlap?: boolean;
    /**
     * If `true`, icon will reserve screen space, other markers of lower priority will not be
     * able to overlap.
     */
    reserveSpace?: boolean;
    /**
     * If isValid is `false`, the icon will no longer be placed or rendered. The reason may be a
     * missing resource. Defaults to `false`.
     */
    isValid?: boolean;
    /**
     * Reference back to owning {@link TextElement}.
     */
    textElement: TextElement;
    /**
     * @hidden
     * If false, text will not be rendered during camera movements. Defaults to `true`.
     */
    renderTextDuringMovements?: boolean;
    /**
     * @hidden
     * Direct access to {@link ImageItem} once it is resolved or `null` if not resolvable.
     */
    imageItem?: ImageItem | null;
    /**
     * @hidden
     * Direct access to {@link @arcadecity/arcade-map/datasource-protocol#ImageTexture} once it is resolved.
     */
    imageTexture?: ImageTexture;
    /**
     * @hidden
     * Layout help: A shield group is for all [[LineMarker]]s that have the same icon and text,
     * making them the same road shield icon.
     */
    shieldGroupIndex?: number;
    /**
     * @hidden
     * Internal reference to a render batch, made up of all icons that use the same Material.
     */
    buffer?: PoiBuffer;
    /**
     * @hidden
     * Should be computed during loading/initializing of `ImageTexture`.
     */
    computedWidth?: number;
    /**
     * @hidden
     * Should be computed during loading/initializing of `ImageTexture`.
     */
    computedHeight?: number;
    /**
     * @hidden
     * Should be computed during loading/initializing of `ImageTexture`.
     */
    uvBox?: Math2D.UvBox;
    /**
     * @hidden
     * Computed from owning {@link TextElement}. Value is set when `PoiInfo` is assigned to
     * {@link TextElement}.
     */
    renderOrder?: number;
}
/**
 * Return 'true' if the POI has been successfully prepared for rendering.
 *
 * @param poiInfo - PoiInfo containing information for rendering the POI icon.
 * @internal
 */
declare function poiIsRenderable(poiInfo: PoiInfo): boolean;
interface TextPickResult extends PickResult {
    /**
     * Text of the picked {@link TextElement}
     */
    text?: string;
}
/**
 * State of loading.
 */
declare enum LoadingState {
    Requested = 0,
    Loaded = 1,
    Initialized = 2
}
/**
 * `TextElement` is used to create 2D text elements (for example, labels).
 * @internal
 */
declare class TextElement {
    readonly text: string;
    readonly points: THREE$1.Vector3[] | THREE$1.Vector3;
    readonly renderParams: TextRenderParameters | TextRenderStyle;
    readonly layoutParams: TextLayoutParameters | TextLayoutStyle;
    priority: number;
    xOffset: number;
    yOffset: number;
    featureId?: string | number | undefined;
    style?: string | undefined;
    fadeNear?: number | undefined;
    fadeFar?: number | undefined;
    readonly tileOffset?: number | undefined;
    readonly offsetDirection?: number | undefined;
    readonly dataSourceName?: string | undefined;
    readonly dataSourceOrder?: number | undefined;
    /**
     * Text elements with this priority are placed on screen before any others.
     */
    static readonly HIGHEST_PRIORITY: number;
    /**
     * Determines visibility. If set to `false`, it will not be rendered.
     */
    visible: boolean;
    /**
     * Determines minimum zoom level for visibility. Can be used to reduce the number of visible
     * `TextElement`s based on zoom level.
     */
    minZoomLevel?: number;
    /**
     * Determines maximum zoom level for visibility. Can be used to reduce the number of visible
     * `TextElement`s based on zoom level.
     */
    maxZoomLevel?: number;
    /**
     * If `true`, label is allowed to overlap other labels or icons of lower priority.
     * @default `false`
     */
    mayOverlap?: boolean;
    /**
     * If `true`, label will reserve screen space, other markers of lower priority will not be
     * able to overlap.
     * @default `true`
     */
    reserveSpace?: boolean;
    /**
     * If `true`, the label will always be rendered on top. If overlapping with other labels, the
     * render order is undefined;
     * @default `false`
     */
    alwaysOnTop?: boolean;
    /**
     * Ignore distance limit. Used for label in labeled-icons.
     */
    ignoreDistance?: boolean;
    /**
     * Scaling factor of text. Defaults to 0.5, reducing the size ot 50% in the distance.
     */
    distanceScale: number;
    /**
     * Optional user data. Will be retrieved during picking.
     */
    userData?: any;
    /**
     * If specified, determines the render order between `TextElement`s. The number different
     * renderOrders should be as small as possible, because every specific `renderOrder` may result
     * in one or more draw calls.
     *
     * TextElements with the same integer `renderOrder` will be rendered in the same batch.
     *
     * The `renderOrder` of `TextElement`s are only relative to other `TextElement`s, and not other
     * map elements.
     *
     * A `TextElement` with a higher `renderOrder` will be rendered after a `TextElement` with a
     * lower `renderOrder`.
     */
    renderOrder: number;
    /**
     * Specified kind of geometry. One kind is set as default in the technique, and can be
     * overridden in the style.
     */
    kind?: GeometryKind | GeometryKindSet;
    /**
     * @hidden
     * Used during rendering.
     */
    loadingState?: LoadingState;
    /**
     * If set to `true` the geometry has been already overlaid on elevation.
     */
    elevated: boolean;
    /**
     * @hidden
     * Array storing the style {@link @arcadecity/arcade-map/text-canvas#GlyphData} for
     * this `TextElement` to speed up label placement in
     * {@link TextElementsRenderer}. Valid after `loadingState` is `Initialized`.
     */
    glyphs?: GlyphData[];
    /**
     * @hidden
     * Array storing the casing (`true`: uppercase, `false`: lowercase)
     * for this `TextElement`.
     * Used by labels in {@link TextElementsRenderer} to support
     * `SmallCaps`. Valid after `loadingState`
     * is `Initialized`.
     */
    glyphCaseArray?: boolean[];
    /**
     * Screen space bounds for this `TextElement`.
     *
     * @remarks
     * Used by point labels in {@link TextElementsRenderer}.
     * Valid after `loadingState` is `Initialized`.
     */
    bounds?: THREE$1.Box2;
    /**
     * @hidden
     * Pre-computed text vertex buffer. Used by point labels in {@link TextElementsRenderer}. Valid
     * after label becomes visible for the first time.
     */
    textBufferObject?: TextBufferObject;
    /**
     * @hidden
     * If `true`, the estimated bounding box of the path is too small for the label to fit, so it is
     * being ignored for rendering in the latest frame.
     */
    dbgPathTooSmall?: boolean;
    pathLengthSqr?: number;
    /**
     * Time to fade in text in milliseconds.
     * @default [[DEFAULT_FADE_TIME]] 800
     */
    textFadeTime?: number;
    type: TextElementType;
    private m_poiInfo?;
    private m_renderStyle?;
    private m_layoutStyle?;
    /**
     * Creates a new `TextElement`.
     *
     * @param text - The text to display.
     * @param points - The position or a list of points for a curved text, both in world space.
     * @param renderParams - `TextElement` text rendering parameters.
     * @param layoutParams - `TextElement` text layout parameters.
     * @param priority - The priority of the `TextElement. Elements with the highest priority get
     *              placed first, elements with priority of `0` are placed last, elements with a
     *              negative value are always rendered, ignoring priorities and allowing overrides.
     * @param xOffset - Optional X offset of this `TextElement` in screen coordinates.
     * @param yOffset - Optional Y offset of this `TextElement` in screen coordinates.
     * @param featureId - Optional string to identify feature (originated from {@link DataSource}).
     *                  Number ids are deprecated in favor of strings.
     * @param fadeNear - Distance to the camera (0.0 = camera position, 1.0 = farPlane) at which the
     *              label starts fading out (opacity decreases).
     * @param fadeFar - Distance to the camera (0.0 = camera position, 1.0 = farPlane) at which the
     *              label becomes transparent. A value of <= 0.0 disables fading.
     * @param offsetDirection - Direction represented as an angle in degrees clockwise from north to
     * offset the icon in world space.
     */
    constructor(text: string, points: THREE$1.Vector3[] | THREE$1.Vector3, renderParams: TextRenderParameters | TextRenderStyle, layoutParams: TextLayoutParameters | TextLayoutStyle, priority?: number, xOffset?: number, yOffset?: number, featureId?: string | number | undefined, style?: string | undefined, fadeNear?: number | undefined, fadeFar?: number | undefined, tileOffset?: number | undefined, offsetDirection?: number | undefined, dataSourceName?: string | undefined, dataSourceOrder?: number | undefined);
    /**
     * The text element position or the first point of the path used to render a curved text, both
     * in world space.
     */
    get position(): THREE$1.Vector3;
    /**
     * The list of points in world space used to render the text along a path or `undefined`.
     */
    get path(): THREE$1.Vector3[] | undefined;
    /**
     * If `true`, `TextElement` is allowed to overlap other labels or icons of lower priority.
     *
     * @default `false`
     */
    get textMayOverlap(): boolean;
    set textMayOverlap(mayOverlap: boolean);
    /**
     * If `true`, `TextElement` will reserve screen space, other markers of lower priority will not
     * be able to overlap.
     *
     * @default `true`
     */
    get textReservesSpace(): boolean;
    set textReservesSpace(reserveSpace: boolean);
    /**
     * Contains additional information about icon to be rendered along with text.
     */
    get poiInfo(): PoiInfo | undefined;
    set poiInfo(poiInfo: PoiInfo | undefined);
    /**
     * @returns The style used to render this text element, undefined if not set yet.
     */
    get renderStyle(): TextRenderStyle | undefined;
    /**
     * Sets style used for text rendering.
     * @param style - The style to use.
     */
    set renderStyle(style: TextRenderStyle | undefined);
    /**
     * @returns The style used to layout this text element, undefined if not set yet.
     */
    get layoutStyle(): TextLayoutStyle | undefined;
    /**
     * Sets the style used for text layout.
     * @param style - The style to use.
     */
    set layoutStyle(style: TextLayoutStyle | undefined);
    /**
     * @returns Whether this text element has a valid feature id.
     */
    hasFeatureId(): boolean;
    /**
     * Disposes of any allocated resources.
     */
    dispose(): void;
}

/**
 * Group of {@link TextElement} sharing same priority.
 */
declare class TextElementGroup extends PriorityListGroup<TextElement> {
}

/**
 * List of {@link TextElement} groups sorted by priority.
 */
declare class TextElementGroupPriorityList extends GroupedPriorityList<TextElement> {
}

declare class TileTextStyleCache {
    private textRenderStyles;
    private textLayoutStyles;
    private readonly tile;
    constructor(tile: Tile);
    clear(): void;
    getRenderStyle(technique: (TextTechnique | PoiTechnique | LineMarkerTechnique) & IndexedTechniqueParams): TextRenderStyle;
    getLayoutStyle(technique: (TextTechnique | PoiTechnique | LineMarkerTechnique) & IndexedTechniqueParams): TextLayoutStyle;
}

declare type TileObject = THREE$1.Object3D & {
    /**
     * Distance of this object from the {@link Tile}'s center.
     */
    displacement?: THREE$1.Vector3;
};
/**
 * An interface for optional feature data that is saved in a `THREE.Object3D`'s `userData`
 * property.
 */
interface TileFeatureData {
    /**
     * The original type of geometry.
     */
    geometryType?: GeometryType;
    /**
     * An optional array of sorted indices into geometry where the feature starts. The lists of IDs
     * and starting indices (starts) must have the same size.
     * Feature i starts at starts[i] and ends at starts[i+1]-1, except for the last feature, which
     * ends at the last index in the object's geometry.
     */
    starts?: number[];
    /**
     * An optional object containing properties defined by the developer. It has the same size as
     * the list of IDs and the starting indices (starts).
     */
    objInfos?: Array<{} | undefined>;
}
/**
 * Compute the memory footprint of `TileFeatureData`.
 *
 * @internal
 */
declare function getFeatureDataSize(featureData: TileFeatureData): number;
/**
 * An object that contains information about resources used by a tile.
 */
interface TileResourceUsage {
    /**
     * The estimated memory usage, in bytes.
     */
    estimatedMemoryUsage: number;
    /**
     * The amount of vertices used by a tile.
     */
    numVertices: number;
    /**
     * The amount of colors used by a tile.
     */
    numColors: number;
    /**
     * The amount of objects used by a tile.
     */
    numObjects: number;
    /**
     * The amount of geometries used by a tile.
     */
    numGeometries: number;
    /**
     * The amount of materials used by a tile.
     */
    numMaterials: number;
}
/**
 * Simple information about resource usage by the {@link Tile}.
 *
 * @remarks
 * Heap and GPU information are
 * estimations.
 */
interface TileResourceInfo {
    /**
     * Estimated number of bytes used on the heap.
     */
    heapSize: number;
    /**
     * Estimated number of bytes used on the GPU.
     */
    gpuSize: number;
    /**
     * Number of [[THREE.Object3D]] in this tile.
     */
    num3dObjects: number;
    /**
     * Number of {@link TextElement}s in this tile.
     */
    numTextElements: number;
    /**
     * @deprecated This counter has been merged with numTextElements.
     * Number of user {@link TextElement}s in this tile.
     */
    numUserTextElements: number;
}
/**
 * @internal
 */
interface TextElementIndex {
    groupIndex: number;
    elementIndex: number;
}
declare type TileCallback = (tile: Tile) => void;
/**
 * The class that holds the tiled data for a {@link DataSource}.
 */
declare class Tile implements CachedResource {
    readonly dataSource: DataSource;
    readonly tileKey: TileKey;
    /**
     * A list of the THREE.js objects stored in this `Tile`.
     */
    readonly objects: TileObject[];
    /**
     * The optional list of HERE TileKeys of tiles with geometries that cross the boundaries of this
     * `Tile`.
     */
    readonly dependencies: TileKey[];
    /**
     * The bounding box of this `Tile` in geocoordinates.
     */
    readonly geoBox: GeoBox;
    /**
     * Copyright information of this `Tile`'s data.
     */
    copyrightInfo?: CopyrightInfo[];
    /**
     * Keeping some stats for the individual {@link Tile}s to analyze caching behavior.
     *
     * The frame the {@link Tile} was last requested. This is
     * required to know when the given {@link Tile}
     * can be removed from the cache.
     */
    frameNumLastRequested: number;
    /**
     * The frame the `Tile` was first visible.
     */
    frameNumVisible: number;
    /**
     * The last frame this `Tile` has been rendered (or was in the visible set). Used to determine
     * visibility of `Tile` at the end of a frame, if the number is the current frame number, it is
     * visible.
     */
    frameNumLastVisible: number;
    /**
     * After removing from cache, this is the number of frames the `Tile` was visible.
     */
    numFramesVisible: number;
    /**
     * Version stamp of the visibility set in the [[TileManager]]. If the counter is different, the
     * visibility of the Tile's objects has to be calculated. Optimization to reduce overhead of
     * computing visibility.
     */
    visibilityCounter: number;
    /**
     * @hidden
     *
     * Used to tell if the Tile is used temporarily as a fallback tile.
     *
     * levelOffset is in in the range [-quadTreeSearchDistanceUp,
     * quadTreeSearchDistanceDown], where these values come from the
     * {@link VisibleTileSetOptions}
     */
    levelOffset: number;
    /**
     * If the tile should not be rendered, this is used typically when the tile in question
     * is completely covered by another tile and therefore can be skipped without any visual
     * impact. Setting this value directly affects the [[willRender]] method, unless
     * overriden by deriving classes.
     */
    skipRendering: boolean;
    /**
     * If the tile should not yet be rendered, this is used typically when the tile in question
     * does not fit into the gpu upload limit of the current frame.
     * Setting this value directly affects the [[willRender]] method, unless
     * overriden by deriving classes.
     */
    delayRendering: boolean;
    /**
     * @hidden
     *
     * Prepared text geometries optimized for display.
     */
    protected preparedTextPaths: TextPathGeometry[] | undefined;
    protected readonly m_tileGeometryLoader?: TileGeometryLoader;
    /**
     * The bounding box of this `Tile` in world coordinates.
     */
    private readonly m_boundingBox;
    private m_disposed;
    private m_disposeCallback?;
    private readonly m_localTangentSpace;
    private m_forceHasGeometry;
    private m_tileLoader?;
    private m_decodedTile?;
    private m_textElementGroups;
    private readonly m_pathBlockingElements;
    private m_textElementsChanged;
    private readonly m_worldCenter;
    private m_visibleArea;
    private readonly m_elevationRange;
    private m_maxGeometryHeight?;
    private m_minGeometryHeight?;
    private m_resourceInfo;
    private readonly m_ownedTextures;
    private readonly m_textStyleCache;
    private m_uniqueKey;
    private m_offset;
    /**
     * Creates a new {@link Tile}.
     *
     * @param dataSource - The {@link DataSource} that created this {@link Tile}.
     * @param tileKey - The unique identifier for this {@link Tile}.
     *                  Currently only up to level 24 is
     *                  supported, because of the use of the upper bits for the offset.
     * @param offset - The optional offset, this is an integer which represents what multiple of 360
     *                 degrees to shift, only useful for flat projections, hence optional.
     * @param localTangentSpace - Whether the tile geometry is in local tangent space or not.
     */
    constructor(dataSource: DataSource, tileKey: TileKey, offset?: number, localTangentSpace?: boolean);
    /**
     * The visibility status of the {@link Tile}. It is actually
     * visible or planned to become visible.
     */
    get isVisible(): boolean;
    /**
     * Sets the tile visibility status.
     * @param visible - `True` to mark the tile as visible, `False` otherwise.
     */
    set isVisible(visible: boolean);
    /**
     * The {@link @arcadecity/arcade-map/geoutils#Projection} currently used by the {@link MapView}.
     */
    get projection(): Projection;
    /**
     * The {@link MapView} this `Tile` belongs to.
     */
    get mapView(): MapView;
    /**
     * Whether the data of this tile is in local tangent space or not.
     *
     * @remarks
     * If the data is in local tangent space (i.e. up vector is (0,0,1) for high zoomlevels) then
     * {@link MapView} will rotate the objects before rendering using the rotation matrix of the
     * oriented [[boundingBox]].
     */
    get localTangentSpace(): boolean;
    get memoryUsage(): number;
    /**
     * The center of this `Tile` in world coordinates.
     */
    get center(): THREE$1.Vector3;
    /**
     * Gets the key to uniquely represent this tile (based on
     * the {@link tileKey} and {@link offset}).
     *
     * @remarks
     * This key is only unique within the given {@link DataSource},
     * to get a key which is unique across
     * {@link DataSource}s see [[DataSourceCache.getKeyForTile]].
     */
    get uniqueKey(): number;
    /**
     * The optional offset, this is an integer which represents what multiple of 360 degrees to
     * shift, only useful for flat projections, hence optional.
     */
    get offset(): number;
    /**
     * The optional offset, this is an integer which represents what multiple of 360 degrees to
     * shift, only useful for flat projections, hence optional.
     * @param offset - Which multiple of 360 degrees to apply to the {@link Tile}.
     */
    set offset(offset: number);
    /**
     * Compute {@link TileResourceInfo} of this `Tile`.
     *
     * @remarks
     * May be using a cached value. The method
     * `invalidateResourceInfo` can be called beforehand to force a recalculation.
     *
     * @returns `TileResourceInfo` for this `Tile`.
     */
    getResourceInfo(): TileResourceInfo;
    /**
     * Force invalidation of the cached {@link TileResourceInfo}.
     *
     * @remarks
     * Useful after the `Tile` has been
     * modified.
     */
    invalidateResourceInfo(): void;
    /**
     * Add ownership of a texture to this tile.
     *
     * @remarks
     * The texture will be disposed if the `Tile` is disposed.
     * @param texture - Texture to be owned by the `Tile`
     */
    addOwnedTexture(texture: THREE$1.Texture): void;
    /**
     * @internal
     * @deprecated User text elements are deprecated.
     *
     * Gets the list of developer-defined {@link TextElement} in this `Tile`.
     *
     * @remarks
     * This list is always rendered first.
     */
    get userTextElements(): TextElementGroup;
    /**
     * Adds a developer-defined {@link TextElement} to this `Tile`.
     *
     * @remarks
     * The {@link TextElement} is always
     * visible, if it's in the map's currently visible area.
     *
     * @deprecated use [[addTextElement]].
     *
     * @param textElement - The Text element to add.
     */
    addUserTextElement(textElement: TextElement): void;
    /**
     * Removes a developer-defined {@link TextElement} from this `Tile`.
     *
     * @deprecated use `removeTextElement`.
     *
     * @param textElement - A developer-defined TextElement to remove.
     * @returns `true` if the element has been removed successfully; `false` otherwise.
     */
    removeUserTextElement(textElement: TextElement): boolean;
    /**
     * Adds a {@link TextElement} to this `Tile`, which is added to the visible set of
     * {@link TextElement}s based on the capacity and visibility.
     *
     * @remarks
     * The {@link TextElement}'s priority controls if or when it becomes visible.
     *
     * To ensure that a TextElement is visible, use a high value for its priority, such as
     * `TextElement.HIGHEST_PRIORITY`. Since the number of visible TextElements is limited by the
     * screen space, not all TextElements are visible at all times.
     *
     * @param textElement - The TextElement to add.
     */
    addTextElement(textElement: TextElement): void;
    /**
     * Adds a `PathBlockingElement` to this `Tile`.
     *
     * @remarks
     * This path has the highest priority and blocks
     * all other labels. There maybe in future a use case to give it a priority, but as that isn't
     * yet required, it is left to be implemented later if required.
     * @param blockingElement - Element which should block all other labels.
     */
    addBlockingElement(blockingElement: PathBlockingElement): void;
    /**
     * Removes a {@link TextElement} from this `Tile`.
     *
     * @remarks
     * For the element to be removed successfully, the
     * priority of the {@link TextElement} has to be equal to its priority when it was added.
     *
     * @param textElement - The TextElement to remove.
     * @returns `true` if the TextElement has been removed successfully; `false` otherwise.
     */
    removeTextElement(textElement: TextElement): boolean;
    /**
     * @internal
     *
     * Gets the current `GroupedPriorityList` which
     * contains a list of all {@link TextElement}s to be
     * selected and placed for rendering.
     */
    get textElementGroups(): TextElementGroupPriorityList;
    /**
     * Gets the current modification state for the list
     * of {@link TextElement}s in the `Tile`.
     *
     * @remarks
     * If the value is `true` the `TextElement` is placed for
     * rendering during the next frame.
     */
    get textElementsChanged(): boolean;
    set textElementsChanged(changed: boolean);
    /**
     * Returns true if the `Tile` has any text elements to render.
     */
    hasTextElements(): boolean;
    /**
     * Get the current blocking elements.
     */
    get blockingElements(): PathBlockingElement[];
    /**
     * Called before {@link MapView} starts rendering this `Tile`.
     *
     * @remarks
     * @param zoomLevel - The current zoom level.
     * @returns Returns `true` if this `Tile` should be rendered. Influenced directly by the
     *      `skipRendering` property unless specifically overriden in deriving classes.
     */
    willRender(_zoomLevel: number): boolean;
    /**
     * Called after {@link MapView} has rendered this `Tile`.
     */
    didRender(): void;
    /**
     * Estimated visible area of tile used for sorting the priorities during loading.
     */
    get visibleArea(): number;
    set visibleArea(area: number);
    /**
     * @internal
     * Gets the tile's ground elevation range in meters.
     */
    get elevationRange(): ElevationRange;
    /**
     * @internal
     * Sets the tile's ground elevation range in meters.
     *
     * @param elevationRange - The elevation range.
     */
    set elevationRange(elevationRange: ElevationRange);
    /**
     * Gets the decoded tile; it is removed after geometry handling.
     */
    get decodedTile(): DecodedTile | undefined;
    /**
     * Applies the decoded tile to the tile.
     *
     * @remarks
     * If the geometry is empty, then the tile's forceHasGeometry flag is set.
     * Map is updated.
     * @param decodedTile - The decoded tile to set.
     */
    set decodedTile(decodedTile: DecodedTile | undefined);
    /**
     * Called when the default implementation of `dispose()` needs
     * to free the geometry of a `Tile` object.
     *
     * @param object - The object that references the geometry.
     * @returns `true` if the geometry can be disposed.
     */
    shouldDisposeObjectGeometry(object: TileObject): boolean;
    /**
     * Called when the default implementation of `dispose()` needs
     * to free a `Tile` object's material.
     *
     * @param object - The object referencing the geometry.
     * @returns `true` if the material can be disposed.
     */
    shouldDisposeObjectMaterial(object: TileObject): boolean;
    /**
     * Called when the default implementation of `dispose()` needs
     * to free a Texture that is part of a `Tile` object's material.
     *
     * @param texture - The texture about to be disposed.
     * @returns `true` if the texture can be disposed.
     */
    shouldDisposeTexture(texture: THREE$1.Texture): boolean;
    /**
     * Returns `true` if this `Tile` has been disposed.
     */
    get disposed(): boolean;
    /**
     * `True` if all geometry of the `Tile` has been loaded.
     */
    get allGeometryLoaded(): boolean;
    /**
     * MapView checks if this `Tile` is ready to be rendered while culling.
     *
     * By default, MapView checks if the [[objects]] list is not empty. However, you can override
     * this check by manually setting this property.
     */
    get hasGeometry(): boolean;
    /**
     * Overrides the default value for [[hasGeometry]] if value is not `undefined`.
     *
     * @param value - A new value for the [[hasGeometry]] flag.
     */
    forceHasGeometry(value: boolean | undefined): void;
    /**
     * Reset the visibility counter. This will force the visibility check to be rerun on all objects
     * in this `Tile`.
     */
    resetVisibilityCounter(): void;
    /**
     * Gets the {@link ITileLoader} that manages this tile.
     */
    get tileLoader(): ITileLoader | undefined;
    /**
     * Sets the {@link ITileLoader} to manage this tile.
     *
     * @param tileLoader - A {@link ITileLoader} instance to manage
     *                     the loading process for this tile.
     */
    set tileLoader(tileLoader: ITileLoader | undefined);
    /**
     * Loads this `Tile` geometry.
     *
     * @returns Promise which can be used to wait for the loading to be finished.
     */
    load(): Promise<void>;
    /**
     * Text style cache for this tile.
     * @hidden
     */
    get textStyleCache(): TileTextStyleCache;
    /**
     * Frees the rendering resources allocated by this `Tile`.
     *
     * @remarks
     * The default implementation of this method frees the geometries and the materials for all the
     * reachable objects.
     * Textures are freed if they are owned by this `Tile` (i.e. if they where created by this
     * `Tile`or if the ownership was explicitely set to this `Tile` by [[addOwnedTexture]]).
     */
    clear(): void;
    /**
     * Removes all {@link TextElement} from the tile.
     */
    clearTextElements(): void;
    /**
     * Adds a callback that will be called whenever the tile is disposed.
     *
     * @remarks
     * Multiple callbacks may be added.
     * @internal
     * @param callback - The callback to be called when the tile is disposed.
     */
    addDisposeCallback(callback: TileCallback): void;
    /**
     * Disposes this `Tile`, freeing all geometries and materials for the reachable objects.
     */
    dispose(): void;
    /**
     * Computes the offset in the x world coordinates corresponding to this tile, based on
     * its {@link offset}.
     *
     * @returns The x offset.
     */
    computeWorldOffsetX(): number;
    /**
     * Update tile for current map view zoom level
     * @param zoomLevel - Zoom level of the map view
     * @internal
     */
    update(zoomLevel: number): void;
    /**
     * Gets the tile's bounding box.
     */
    get boundingBox(): OrientedBox3;
    /**
     * Start with or continue with loading geometry for tiles requiring this step. Called
     * repeatedly until loading is finished.
     * @param priority - Priority assigned to asynchronous tasks doing the geometry update.
     * @param enabledKinds - {@link GeometryKind}s that will be created.
     * @param disabledKinds - {@link GeometryKind}s that will not be created.
     * @return `true` if tile uses a geometry loader, `false` otherwise.
     * @internal
     */
    updateGeometry(priority?: number, enabledKinds?: GeometryKindSet, disabledKinds?: GeometryKindSet): boolean;
    /**
     * Gets a set of the {@link GeometryKind}s that were loaded (if any).
     * @internal
     */
    get loadedGeometryKinds(): GeometryKindSet | undefined;
    /**
     * Called when {@link TileGeometryLoader} is finished.
     *
     * @remarks
     * It may be used to add content to the `Tile`.
     * The {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile} is still available.
     */
    protected loadingFinished(): void;
    private attachGeometryLoadedCallback;
    /**
     * Remove the decodedTile when no longer needed.
     */
    private removeDecodedTile;
    /**
     * Updates the tile's world bounding box.
     * @param newBoundingBox - The new bounding box to set. If undefined, the bounding box will be
     *                         computed by projecting the tile's geoBox.
     */
    private updateBoundingBox;
    /**
     * Elevates the tile's geo box using the elevation range and maximum geometry height.
     */
    private elevateGeoBox;
    private computeResourceInfo;
}

/**
 * Options for a {@link DataSource}.
 */
interface DataSourceOptions {
    /**
     * The unique name of a {@link DataSource} instance.
     */
    name?: string;
    /**
     * The name of the [[StyleSet]] to evaluate for the decoding.
     */
    styleSetName?: string;
    /**
     * Used to configure the languages used by the `DataSource` according to priority;
     * the first language in the array has the highest priority.
     *
     *  An array of ISO 639-1 language codes.
     */
    languages?: string[];
    /**
     * The minimum zoom level at which data is available or displayed at
     * (depending on {@link DataSource} subclass).
     * @deprecated Use [[minDataLevel]] and [[minDisplayLevel]] instead.
     */
    minZoomLevel?: number;
    /**
     * The maximum zoom level at which data is available or displayed at
     * (depending on {@link DataSource} subclass).
     * @deprecated Use [[maxDataLevel]] and [[maxDisplayLevel]] instead.
     */
    maxZoomLevel?: number;
    /**
     * The minimum zoom level at which data is available.
     */
    minDataLevel?: number;
    /**
     * The maximum zoom level at which data is available.
     */
    maxDataLevel?: number;
    /**
     * The minimum zoom level at which {@link DataSource} is displayed.
     */
    minDisplayLevel?: number;
    /**
     * The maximum zoom level at which {@link DataSource} is displayed.
     */
    maxDisplayLevel?: number;
    /**
     * Storage level offset applied to this `DataSource`.
     */
    storageLevelOffset?: number;
    /**
     * Whether the datasource can overlap tiles. Such overlapping is necessary when zooming out and
     * waiting for the tiles to load, in this case, we use cached tiles to fill the missing gaps if
     * available (and in some cases, the tiles can overlap, i.e. for example when a child is next
     * to a parent, the parent is rendered beneath the child), however for some datasources (those
     * that produce transparent tiles for example), this gives bad results, and as such, it should
     * be disabled to reduce flickering. Another way to put it is that loading tiles are replaced
     * with cached tiles and we then fall (back/forward) to the next appropriate zoom level.
     * @default true
     */
    allowOverlappingTiles?: boolean;
    /**
     * Whether features from these data source can picked by calling
     * {@link MapView.intersectMapObjects}. Disabling picking for data sources that don't need it
     * will improve picking performance.
     * @default true
     */
    enablePicking?: boolean;
    /**
     * Maximum geometry height above ground level this {@link DataSource} can produce.
     *
     * @remarks
     * Used in first stage of frustum culling before {@link Tile#maxGeometryHeight} data is
     * available.
     *
     * @default [[EarthConstants.MAX_BUILDING_HEIGHT]].
     */
    maxGeometryHeight?: number;
    /**
     * Minimum geometry height below ground level this {@link DataSource} can produce. Negative
     * values describe height below ground.
     *
     * @remarks
     * Used in first stage of frustum culling before {@link Tile#minGeometryHeight} data is
     * available.
     *
     * @default `0`.
     */
    minGeometryHeight?: number;
    /**
     * Number used to order [DataSource]'s relative to each other, see
     * {@link DataSource.dataSourceOrder}
     */
    dataSourceOrder?: number;
}
/**
 * Derive a class from `DataSource` to contribute data and geometries to the {@link MapView}.
 */
declare abstract class DataSource extends THREE$1.EventDispatcher {
    /**
     * Keep the update event here to avoid a global reference to the datasource (and thus prevent garbage collection).
     */
    private readonly UPDATE_EVENT;
    /**
     * A counter to generate unique names for each `DataSource`, if no name is provided in the
     * constructor.
     */
    private static uniqueNameCounter;
    /**
     * Set to `true` if this `DataSource` is enabled; `false` otherwise.
     */
    enabled: boolean;
    /**
     * Set to `true` if the {@link MapView} can cache tiles produced by this `DataSource`.
     */
    cacheable: boolean;
    /**
     * Set to `true` if the loader should be used to get the tile contents.
     */
    useGeometryLoader: boolean;
    /**
     * The unique name of a `DataSource` instance.
     */
    name: string;
    /**
     * Whether the datasource should have a ground plane (this plane covers the tile entirely and
     * has the minimum possible renderOrder), this can be required in some cases when fallback
     * parent tiles need to be covered by the children, otherwise the content will overlap.
     * Default is false
     */
    addGroundPlane: boolean;
    /**
     * The minimum zoom level at which data is available.
     */
    minDataLevel: number;
    /**
     * The maximum zoom level at which data is available.
     */
    maxDataLevel: number;
    /**
     * The minimum zoom level at which {@link DataSource} is displayed.
     */
    minDisplayLevel: number;
    /**
     * The maximum zoom level at which {@link DataSource} is displayed.
     */
    maxDisplayLevel: number;
    allowOverlappingTiles: boolean;
    enablePicking: boolean;
    /**
     * Overrides the default rendering order of this `DataSource`.
     *
     * @remarks
     * When `dataSourceOrder` is defined, all the objects created by this `DataSource`
     * will be rendered on top of the objects created by other `DataSource`s with
     * lower `dataSourceOrder` values.
     *
     * @defaultValue undefined
     */
    dataSourceOrder: number;
    /**
     * @internal
     * @hidden
     */
    readonly exprPool: ExprPool;
    /**
     * The {@link MapView} instance holding a reference to this `DataSource`.
     */
    private m_mapView?;
    /**
     * The name of the [[StyleSet]] to evaluate for the decoding.
     */
    private m_styleSetName?;
    /**
     * Current value of [[maxGeometryHeight]] property.
     */
    private m_maxGeometryHeight;
    /**
     * Current value of [[minGeometryHeight]] property.
     */
    private m_minGeometryHeight;
    /**
     * Storage level offset applied to this `DataSource`.
     */
    private m_storageLevelOffset;
    private readonly m_featureStateMap;
    /**
     *  An array of ISO 639-1 language codes.
     */
    protected languages?: string[];
    /**
     * Constructs a new `DataSource`.
     *
     * @param options - The options to create the data source.
     */
    constructor(options?: DataSourceOptions);
    /**
     * Gets the state of the given feature id.
     *
     * @param featureId - The id of the feature. Id numbers are deprecated in favor of strings.
     */
    getFeatureState(featureId: number | string): ValueMap | undefined;
    /**
     * Clears the state of all the features of this {@link DataSource}.
     */
    clearFeatureState(): void;
    /**
     * Sets the state of the given feature id.
     *
     * ```typescript
     * dataSource.setFeatureState(featureId, { enabled: true });
     * ```
     *
     * @param featureId - The id of the feature. Id numbers are deprecated in favor of strings.
     * @param state - The new state of the feature.
     */
    setFeatureState(featureId: number | string, state: ValueMap): void;
    /**
     * Removes the state associated to the given feature.
     *
     * @param featureId - The id of the feature. Id numbers are deprecated in favor of strings.
     */
    removeFeatureState(featureId: number | string): void;
    /**
     * Returns the name of the [[StyleSet]] to use for the decoding.
     */
    get styleSetName(): string | undefined;
    /**
     * Sets the name of the [[StyleSet]] to use for the decoding.
     * If this {@link DataSource} is already
     * attached to a {@link MapView}, this setter then reapplies
     * [[StyleSet]] with this name found in
     * {@link MapView}s theme.
     */
    set styleSetName(styleSetName: string | undefined);
    /**
     * Destroys this `DataSource`.
     */
    dispose(): void;
    /**
     * Purges all the caching done by this `DataSource`
     */
    clearCache(): void;
    /**
     * Boolean which says whether a {@link DataSource} produces
     * tiles that fully cover the tile, i.e.
     * tiles underneath are completely hidden. Must be
     * overridden for {@link DataSource}'s that don't
     * have a ground plane, but which still fully
     * cover the tile, e.g. web tiles.
     */
    isFullyCovering(): boolean;
    /**
     * Returns `true` if this `DataSource` is ready
     * and the {@link MapView} can invoke `getTile()` to
     * start requesting data.
     */
    ready(): boolean;
    /**
     * The {@link MapView} that is holding this `DataSource`.
     */
    get mapView(): MapView;
    /**
     * The {@link @arcadecity/arcade-map/geoutils#Projection} used by
     * the {@link MapView} that is holding this `DataSource`.
     *
     * An `Error` is thrown if you call this method
     * before this `DataSource` has been added
     * to a {@link MapView}.
     */
    get projection(): Projection;
    /**
     * This method is called when the `DataSource` is added to a {@link MapView}. Override this
     * method to provide any custom initialization, such as, to establish a network connection,
     * or to initialize complex data structures.
     */
    connect(): Promise<void>;
    /**
     * Returns the {@link @arcadecity/arcade-map/geoutils#TilingScheme} used by this `DataSource`.
     */
    abstract getTilingScheme(): TilingScheme;
    /**
     * This method is called when this `DataSource` is added to a {@link MapView}.
     *
     * Overrides of this method must invoke the definition of the super class.
     *
     * @param mapView - The instance of the {@link MapView}.
     */
    attach(mapView: MapView): void;
    /**
     * This method is called when this `DataSource` is removed from a {@link MapView}.
     *
     * Overrides of this method must invoke the definition of the super class.
     *
     * @param mapView - The instance of the {@link MapView}.
     */
    detach(mapView: MapView): void;
    /**
     * @return Whether this `DataSource` is detached from the `MapView`
     */
    isDetached(): boolean;
    /**
     * Apply the {@link @arcadecity/arcade-map/datasource-protocol#Theme} to this data source.
     *
     * If `DataSource` depends on a `styleSet` defined by this theme or `languages`, it must update
     * its tiles' geometry.
     *
     * @param theme - The Theme to be applied
     */
    setTheme(theme: Theme): Promise<void>;
    /**
     * Used to configure the languages used by the `DataSource` according to priority;
     * the first language in the array has the highest priority.
     *
     * @param languages - An array of ISO 639-1 language codes.
     */
    setLanguages(languages?: string[]): void;
    /**
     * Used to express different country point of view (political view).
     *
     * @note Set to `undefined` (or empty string) if you want to reset to default point of view.
     * @param pov - The country code which point of view should be presented in lower-case
     * ISO 3166-1 alpha-2 format.
     */
    setPoliticalView(pov?: string): void;
    /**
     * This method is called when {@link MapView} needs to visualize or preload the content of a
     * {@link @arcadecity/arcade-map/geoutils#TileKey}.
     *
     * @param tileKey - The unique identifier for a map tile.
     * @param delayLoad - If true, the Tile will be created, but Tile.load will not be called
     * @default false.
     */
    abstract getTile(tileKey: TileKey, delayLoad?: boolean): Tile | undefined;
    /**
     * This method is called by {@link MapView} before the
     * tile needs to be updated, for example after
     * a theme change.
     *
     * @param tile - The {@link Tile} to update.
     */
    updateTile(tile: Tile): void;
    /**
     * This method is called by the {@link MapView} to determine if the content of the surrounding
     * tiles must be preloaded.
     *
     * @returns `true` if the {@link MapView} should try to preload tiles surrounding the visible
     * tiles; `false` otherwise. The default is `false`.
     */
    shouldPreloadTiles(): boolean;
    /**
     * The minimum zoom level at which data is available or displayed at
     * (depending on {@link DataSource} subclass).
     * @deprecated Use [[minDataLevel]] and [[minDisplayLevel]] instead.
     */
    get minZoomLevel(): number;
    set minZoomLevel(level: number);
    /**
     * The maximum zoom level at which data is available or displayed at
     * (depending on {@link DataSource} subclass).
     * @deprecated Use [[maxDataLevel]] and [[maxDisplayLevel]] instead.
     */
    get maxZoomLevel(): number;
    set maxZoomLevel(level: number);
    /**
     * Maximum geometry height above ground level this `DataSource` can produce.
     *
     * Used in first stage of frustum culling before
     * {@link Tile.maxGeometryHeight} data is available.
     *
     * @default 0.
     */
    get maxGeometryHeight(): number;
    set maxGeometryHeight(value: number);
    /**
     * Minimum geometry height below ground level this `DataSource` can produce. A negative number
     * specifies a value below ground level.
     *
     * Used in first stage of frustum culling before
     * {@link Tile.minGeometryHeight} data is available.
     *
     * @default 0.
     */
    get minGeometryHeight(): number;
    set minGeometryHeight(value: number);
    /**
     * The difference between storage level and display level of tile.
     *
     * Storage level offset is a value applied (added) to current zoom level giving
     * a final tile level being displayed. This way we may differentiate current
     * zoom level from the storage level that is displayed, giving fine grained
     * control over the tiles being decoded an displayed.
     */
    get storageLevelOffset(): number;
    /**
     * Setup the relative offset between storage level and display level of tile.
     *
     * @param levelOffset - Difference between zoom level and display level.
     */
    set storageLevelOffset(levelOffset: number);
    /**
     * Enables or disables overlay of geometry on elevation. It must be overloaded by data sources
     * supporting this feature.
     *
     * @param value - True to enable, false to disable.
     */
    setEnableElevationOverlay(enable: boolean): void;
    /**
     * Computes the data zoom level to use.
     *
     * @param zoomLevel - The zoom level of the {@link MapView}.
     * @returns The data zoom level to use.
     */
    getDataZoomLevel(zoomLevel: number): number;
    /**
     * Returns `true` if {@link DataSource} should be displayed for the zoom level.
     * @param zoomLevel - The zoom level of the {@link MapView}.
     */
    isVisible(zoomLevel: number): boolean;
    /**
     * Returns `true` if {@link DataSource} can load tile with
     * given {@link @arcadecity/arcade-map/geoutils#TileKey} and zoom level.
     *
     * @param zoomLevel - The zoom level of the {@link MapView}.
     * @param tileKey - The unique identifier for a map tile.
     * @returns `true` if the tile for the given {@link @arcadecity/arcade-map/geoutils#TileKey} can be loaded.
     */
    canGetTile(zoomLevel: number, tileKey: TileKey): boolean;
    /**
     * Returns `true` if {@link MapView} should traverse tiles
     * further with given {@link @arcadecity/arcade-map/geoutils#TileKey} and
     * zoom level.
     *
     * @param zoomLevel - The zoom level of the {@link MapView}.
     * @param tileKey - The unique identifier for a map tile.
     * @returns `true` if the subtiles of the given {@link @arcadecity/arcade-map/geoutils#TileKey} should be
     * checked for collisions.
     */
    shouldSubdivide(zoomLevel: number, tileKey: TileKey): boolean;
    /**
     * Returns `true` if {@link MapView} should render the text
     * elements with the given {@link @arcadecity/arcade-map/geoutils#TileKey} and
     * zoom level.
     *
     * @remarks
     * This is an additional check for the tiles that are already selected for rendering so the
     * default implementation returns `true`.
     *
     * @param zoomLevel - The zoom level.
     * @param tileKey - The unique identifier for a map tile.
     * @returns `true` if the text elements created for the
     *          given {@link @arcadecity/arcade-map/geoutils#TileKey} should be rendered.
     */
    shouldRenderText(zoomLevel: number, tileKey: TileKey): boolean;
    /**
     * Sends a request to the {@link MapView} to redraw the scene.
     */
    requestUpdate(): void;
}

/**
 * JavaScript events for custom objects. Stores all listeners to allow removing all listeners for
 * housekeeping.
 *
 * Will be replaced by `THREE.EventDispatcher` once https://github.com/mrdoob/three.js/pull/19844
 * is released.
 */
declare class EventDispatcher {
    private readonly m_listeners;
    /**
     * Destroy this `EventDispatcher` instance.
     *
     * Unregister all event handlers used. This is method should be called when you stop
     * using `EventDispatcher`.
     */
    dispose(): void;
    /**
     * Checks if listener is added to an event type.
     *
     * @param type - The type of event to listen to.
     * @param listener - The function that gets called when the event is fired.
     */
    hasEventListener(type: string, listener?: (event: THREE$1.Event) => void): boolean;
    /**
     * Add a new event listener to the event type.
     *
     * @param type - The type of event to listen to.
     * @param listener - The function that gets called when the event is fired.
     */
    addEventListener(type: string, listener: (event: THREE$1.Event) => void): void;
    /**
     * Remove the listener from the event type.
     *
     * @param type - The type of event to listen to.
     * @param listener - The function that gets called when the event is fired. If the value is
     * `undefined`, all listeners will be removed.
     */
    removeEventListener(type: string, listener?: any): void;
    /**
     * Remove all event listeners for housekeeping.
     */
    removeAllEventListeners(): void;
    /**
     * Retrieve the registered event types.
     *
     * @returns Array of event types.
     */
    get eventTypes(): string[];
    /**
     * Retrieve the registered listeners to the specified event.
     *
     * @param type - The type of event to listen to.
     * @returns Array of event listeners.
     */
    listeners(type: string): Array<(event: THREE$1.Event) => void> | undefined;
    /**
     * Dispatch the event to the registered listeners.
     *
     * @param event - The event to dispatch.
     */
    dispatchEvent(event: THREE$1.Event): void;
}

/**
 * Specifies how the FOV (Field of View) should be calculated.
 */
interface FovCalculation {
    /**
     * How to interpret the [[fov]], can be either `fixed` or `dynamic`.
     *
     * `fixed` means that the FOV is fixed regardless of the [[viewportHeight]], such that shrinking
     * the height causes the map to shrink to keep the content in view. The benefit is that,
     * regardless of any resizes, the field of view is constant, which means there is no change in
     * the distortion of buildings near the edges. However the trade off is that the zoom level
     * changes, which means that the map will pull in new tiles, hence causing some flickering.
     *
     * `dynamic` means that the focal length is calculated based on the supplied [[fov]] and
     * [[viewportHeight]], this means that the map doesn't scale (the image is essentially cropped
     * but not shrunk) when the [[viewportHeight]] or [[viewportWidth]] is changed. The benefit is
     * that the zoom level is (currently) stable during resize, because the focal length is used,
     * however the tradeoff is that changing from a small to a big height will cause the fov to
     * change a lot, and thus introduce distortion.
     */
    type: 'fixed' | 'dynamic';
    /**
     * Vertical field of view in degrees.
     * If [[type]] is `fixed` then the supplied [[fov]] is fixed regardless of
     * [[viewportHeight]] or [[viewportWidth]].
     *
     * If [[type]] is `dynamic` then the supplied [[fov]] is applied to the
     * first frame, and the focal length calculated. Changes to the viewport
     * height no longer shrink the content because the field of view is updated
     * dynamically.
     */
    fov: number;
}
declare const DEFAULT_FOV_CALCULATION: FovCalculation;
declare const MIN_FOV_DEG = 10;
declare const MAX_FOV_DEG = 140;
declare const MIN_FOV_RAD: number;
declare const MAX_FOV_RAD: number;

declare type TileUpdateCallback = (tile: Tile) => void;
/**
 * Manages the content (the geometries) of a tile.
 * @internal
 */
declare class TileGeometryManager {
    protected mapView: MapView;
    /**
     * The set of geometry kinds that is enabled. Their geometry will be created after decoding.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    get enabledGeometryKinds(): GeometryKindSet;
    /**
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    set enabledGeometryKinds(kinds: GeometryKindSet);
    /**
     * The set of geometry kinds that is disabled. Their geometry will not be created after
     * decoding.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    get disabledGeometryKinds(): GeometryKindSet;
    /**
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    set disabledGeometryKinds(kinds: GeometryKindSet);
    /**
     * The set of geometry kinds that is hidden. Their geometry may be created, but it is hidden
     * until the method `hideKind` with an argument of `addOrRemoveToHiddenSet:false` is called.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    get hiddenGeometryKinds(): GeometryKindSet;
    /**
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    set hiddenGeometryKinds(kinds: GeometryKindSet);
    /**
     * If set to `true`, the filters of enabled/disabledGeometryKinds are applied, otherwise they
     * are ignored.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    enableFilterByKind: boolean;
    protected get visibilityCounter(): number;
    protected enabledKinds: GeometryKindSet;
    protected disabledKinds: GeometryKindSet;
    protected hiddenKinds: GeometryKindSet;
    protected m_tileUpdateCallback: TileUpdateCallback | undefined;
    /**
     * Optimization for evaluation in `update()` method. Only if a kind is hidden/unhidden, the
     * visibility of the kinds is applied to their geometries.
     */
    private m_visibilityCounter;
    /**
     * Creates an instance of `TileGeometryManager` with a reference to the {@link MapView}.
     */
    constructor(mapView: MapView);
    /**
     * Process the {@link Tile}s for rendering. May alter the content of the tile per frame.
     */
    updateTiles(tiles: Tile[]): void;
    /**
     * Clear the enabled, disabled and hidden sets.
     */
    clear(): void;
    /**
     * Enable a [[GeometryKind]] by adding it to the enabled set, or remove it from that set.
     *
     * @param {(GeometryKind | GeometryKind[] | GeometryKindSet)} kind The kind to add or remove
     *      from the enabled set.
     * @param {boolean} addOrRemoveToEnabledSet Pass in `true` to add the kind to the set, pass in
     *      `false` to remove from that set.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    enableKind(kind: GeometryKind | GeometryKind[] | GeometryKindSet, addOrRemoveToEnabledSet?: boolean): void;
    /**
     * Disable a [[GeometryKind]] by adding it to the disabled set, or remove it from that set.
     *
     * @param {(GeometryKind | GeometryKind[] | GeometryKindSet)} kind The kind to add or remove
     *      from the disabled set.
     * @param {boolean} addOrRemoveToHiddenSet Pass in `true` to add the kind to the set, pass in
     *      `false` to remove from that set.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    disableKind(kind: GeometryKind | GeometryKind[] | GeometryKindSet, addOrRemoveToDisabledSet?: boolean): void;
    /**
     * Hide a [[GeometryKind]] by adding it to the hidden set, or remove it from that set.
     *
     * @param {(GeometryKind | GeometryKind[] | GeometryKindSet)} kind The kind to add or remove
     *      from the hidden set.
     * @param {boolean} addOrRemoveToHiddenSet Pass in `true` to hide the kind(s), `false` to show
     *      it again.
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    hideKind(kind: GeometryKind | GeometryKind[] | GeometryKindSet, addOrRemoveToHiddenSet?: boolean): void;
    /**
     * Return all [[GeometryKind]]s that are contained in the tiles.
     *
     * @param {IterableIterator<Tile>} tiles The
     * @returns {GeometryKindSet}
     * @deprecated See {@link @here/here-datasource-protocol/BaseTechniqueParams.kind}.
     */
    getAvailableKinds(tiles: IterableIterator<Tile>): GeometryKindSet;
    /**
     * Apply the visibility status taken from the `hiddenKinds` to all geometries in the specified
     * tiles.
     *
     * @param {Tile[]} tiles List of [[Tiles]] to process the visibility status of.
     */
    updateTileObjectVisibility(tiles: Tile[]): boolean;
    /**
     * Sets a callback that will be called for every updated tile on [[updateTiles]].
     *
     * @param {TileUpdateCallback} callback The callback that will be called after a tile has been
     * updated, passing the updated tile as argument. If `undefined`, a previously set callback will
     * be cleared.
     */
    setTileUpdateCallback(callback?: TileUpdateCallback): void;
    protected incrementVisibilityCounter(): number;
    /**
     * Add or remove a kind|array of kinds|set of kinds from the specified kind set.
     *
     * @hidden
     * @param {GeometryKindSet} set
     * @param {(GeometryKind | GeometryKind[] | GeometryKindSet)} kind
     * @param {boolean} addToSet
     */
    private enableDisableKinds;
    /**
     * Add or remove a single kind from the specified kind set.
     *
     * @hidden
     * @param {GeometryKindSet} set
     * @param {(GeometryKind | GeometryKind[] | GeometryKindSet)} kind
     * @param {boolean} addToSet
     */
    private addRemove;
}

/**
 * An interface describing [[THREE.Object3D]]s anchored on
 * given {@link @arcadecity/arcade-map/geoutils#GeoCoordinates}.
 *
 * @remarkks
 * @example
 * Example:
 * ```typescript
 * const mesh: MapAnchor<THREE.Mesh> = new THREE.Mesh(geometry, material);
 * mesh.anchor = new GeoCoordinates(latitude, longitude, altitude);
 * mapView.mapAnchors.add(mesh);
 * ```
 */
declare type MapAnchor<T extends THREE$1.Object3D = THREE$1.Object3D> = T & {
    /**
     * The position of this [[MapAnchor]] in {@link @arcadecity/arcade-map/geoutils#GeoCoordinates}.
     * @deprecated Use [[anchor]] instead.
     */
    geoPosition?: GeoCoordinates;
    /**
     * The anchor of this Object3D in {@link @arcadecity/arcade-map/geoutils#GeoCoordinates}
     * or world coordinates.
     */
    anchor?: GeoCoordLike | Vector3Like;
    /**
     * Flag defining if the object may be picked.
     *
     * @note By default all objects are pickable even if this flag is undefined.
     */
    pickable?: boolean;
    /**
     * The styleSet that owns this map object.
     *
     * @remarks
     * This property is used together with [[Theme.priorities]] to compute the render
     * order of this map object.
     */
    styleSet?: string;
    /**
     * The category of this style.
     *
     * @remarks
     * This property is used together with [[Theme.priorities]] to compute the render
     * order of this map object.
     */
    category?: string;
    /**
     * Whether to draw the anchor on top of labels.
     * @defaultValue false
     */
    overlay?: boolean;
};
/**
 * Container holding [[MapAnchor]] objects.
 */
declare class MapAnchors {
    private m_anchors;
    private m_priorities;
    /**
     * All currently added [[MapAnchor]]s.
     */
    get children(): MapAnchor<THREE$1.Object3D>[];
    /**
     * Add a [[MapAnchor]].
     * @param mapAnchor [[MapAnchor]] instance to add.
     */
    add(mapAnchor: MapAnchor): void;
    /**
     * Remove a [[MapAnchor]].
     * @param mapAnchor - [[MapAnchor]] instance to remove.
     *
     * @note This method is potentially slow when removing a lot of anchors.
     * [[clear]]ing and [[add]]ing anchors should be considered in that case.
     */
    remove(mapAnchor: MapAnchor): void;
    /**
     * Remove all [[MapAnchor]]s.
     */
    clear(): void;
    setPriorities(priorities: StylePriority[]): void;
    /**
     * Update the map anchors.
     * @param projection - Current projection
     * @param cameraPosition - Current camera position
     * @param rootNode - Node where normal anchors will be inserted.
     * @param overlayRootNode - Node where overlay anchors will be insterted.
     * @param priorities - Optional theme priority list
     *
     * @internal
     * @hidden
     */
    update(projection: Projection, cameraPosition: THREE$1.Vector3, rootNode: THREE$1.Object3D, overlayRootNode: THREE$1.Object3D): void;
}

/**
 * Manages the fog display in {@link MapView}.
 */
declare class MapViewFog {
    private m_scene;
    private m_enabled;
    private m_fog;
    private m_fogIsDefined;
    private m_cachedFog;
    /**
     * Constructs a `MapViewFog` instance.
     *
     * @param m_scene - The scene used in {@link MapView} that contains the map objects.
     */
    constructor(m_scene: THREE$1.Scene);
    /**
     * Allows for disabling the fog, even if it is defined in the theme. Use this property for
     * custom views like the demo app's debug camera. However, if the theme does not define a
     * fog, enabling this property here has no effect.
     *
     * @param value - A boolean that specifies whether the fog should be enabled or disabled.
     */
    set enabled(enableFog: boolean);
    /**
     * Returns the current fog status, enabled or disabled.
     */
    get enabled(): boolean;
    /**
     * Sets the fog depending on the {@link @arcadecity/arcade-map/datasource-protocol#Theme}
     * instance provided. This function is called when a
     * theme is loaded. Fog is added only if the theme contains a fog definition with a:
     * - `color` property, used to set the fog color.
     * - `startRatio` property, used to set the start distance of the fog as a ratio of the far
     * clipping plane distance.
     *
     * @param theme - A {@link @arcadecity/arcade-map/datasource-protocol#Theme} instance.
     */
    reset(fog?: Fog): void;
    /**
     * Updates the fog at runtime, depending on the camera.
     *
     * @param camera - An instance of a `THREE.Camera` with a `far` property.
     */
    update(mapView: MapView, viewDistance?: number): void;
    /**
     * Handles fog addition.
     */
    private add;
    /**
     * Handles fog removal.
     */
    private remove;
    /**
     * ThreeJS lets users manage the `RawShaderMaterial` themselves, so they need to be modified
     * explicitly.
     *
     * @see https://github.com/mrdoob/three.js/blob/dev/src/renderers/webgl/WebGLProgram.js#L298
     */
    private setFogInRawShaderMaterials;
}

declare type MapViewEnvironmentOptions = Pick<MapViewOptions, 'addBackgroundDatasource' | 'backgroundTilingScheme'>;
/**
 * Class handling the Scene Environment, like fog, sky, background datasource, clearColor etc
 *  for MapView
 */
declare class MapViewEnvironment {
    private readonly m_mapView;
    private readonly m_fog;
    private m_skyBackground?;
    private m_createdLights?;
    private m_overlayCreatedLights?;
    private readonly m_backgroundDataSource?;
    constructor(m_mapView: MapView, options: MapViewEnvironmentOptions);
    get lights(): THREE$1.Light[];
    get fog(): MapViewFog;
    updateBackgroundDataSource(): void;
    clearBackgroundDataSource(): void;
    update(): void;
    updateClearColor(clearColor?: string, clearAlpha?: number): void;
    updateSkyBackground(sky?: Sky, clearColor?: string): void;
    updateLighting(lights?: Light[]): void;
    /**
     * Update the directional light camera. Note, this requires the cameras to first be updated.
     */
    updateLights(): void;
    private addNewSkyBackground;
    private removeSkyBackGround;
    private updateSkyBackgroundColors;
    /**
     * Transfer from view space to camera space.
     * @param viewPos - position in view space, result is stored here.
     */
    private viewToLightSpace;
}

/**
 * Class to store and maintain individual POI information for the {@link PoiTable}.
 */
declare class PoiTableEntry implements PoiTableEntryDef {
    /**
     * Verify that the JSON description of the POI table entry is valid.
     *
     * @param jsonEntry - JSON description of the POI table entry.
     *
     * @returns `true` if the `jsonEntry` is valid.
     */
    static verifyJSON(jsonEntry: PoiTableEntryDef): boolean;
    /** Default name of the POI as the key for looking it up. */
    name?: string;
    /** Alternative names of the POI. */
    altNames?: string[];
    /** Visibility of the POI. If `false`, the POI will not be rendered. */
    visible?: boolean;
    /** Name of the icon, defined in the the texture atlases. */
    iconName?: string;
    /** Stacking mode of the POI. For future use. */
    stackMode?: PoiStackMode;
    /**
     * Priority of the POI to select the visible set in case there are more POIs than can be
     * handled.
     */
    priority?: number;
    /** Minimum zoom level to render the icon on. */
    iconMinLevel?: number;
    /** Maximum zoom level to render the icon on. */
    iconMaxLevel?: number;
    /** Minimum zoom level to render the text label on. */
    textMinLevel?: number;
    /** Maximum zoom level to render the text label on. */
    textMaxLevel?: number;
    /**
     * Setup the [[PoiTableEntry]] from the JSON description. It is assumed that the jsonEntry has
     * been verified with [[PoiTableEntry#verifyJSON]].
     *
     * @param jsonEntry - JSON description of the POI table entry. Expected to have been verified
     *                    with [[PoiTableEntry#verifyJSON]].
     */
    setup(jsonEntry: PoiTableEntryDef): void;
}
/**
 * The `PoiTable` stores individual information for each POI type.
 *
 * @remarks
 * If a {@link TextElement} has a
 * reference to a PoiTable (if TextElement.poiInfo.poiTableName is set), information for the
 * TextElement and its icon are read from the PoiTable.
 *
 * The key to look up the POI is taken from the data, in case of OSM data with TileZen data, the
 * `poiNameField` is set to `kind`, which makes the content of the field `kind` in the data the key
 * to look up the POIs in the {@link PoiTable}.
 *
 * On the side of the {@link PoiTable}, the key to look up the PoiTableEntry is either the property
 * "name" of the [[PoiTableEntry]] (which should be unique), or the alternative list of names
 * `altNames`, where each value should also be unique. If the property `useAltNamesForKey` is set to
 * `true`, the `altNames` will be used.
 */
declare class PoiTable {
    readonly name: string;
    readonly useAltNamesForKey: boolean;
    /**
     * Stores the list of [[PoiTableEntry]]s.
     */
    private readonly poiList;
    /**
     * Dictionary to look up for [[PoiTableEntry]] quickly. The dictionary is either created for
     * the `name` property of the [[PoiTableEntry]], which will identify POI, or for all of
     * alternative the names defined in `altNames` of [[PoiTableEntry]] JSON object.
     * Value assigned to key it is the index to [[poiList]] array which contain actual
     * [[PoiTabelEntry]] objects.
     */
    private readonly poiDict;
    private m_isLoading;
    private m_loadedOk;
    /**
     * Creates an instance of PoiTable.
     *
     * @param {string} name Name of the `PoiTable`. Must be unique.
     * @param {boolean} useAltNamesForKey Pass `true` to use the contents of the property `altNames`
     *          to find a [[PoiTableEntry]] in the table.
     */
    constructor(name: string, useAltNamesForKey: boolean);
    /**
     * Returns `true` if the table is currently being loaded, `false` otherwise.
     *
     * @readonly
     */
    get isLoading(): boolean;
    /**
     * Returns `true` if the table has been loaded correctly, `false` otherwise.
     *
     * @readonly
     */
    get loadedOk(): boolean;
    /**
     * Gets [[PoiTableEntry]] for poi name specified.
     *
     * @param poiName - poi name or one of its alternative names if [[useAltNamesForKey]] is
     * set to `true`.
     * @returns [[PoiTableEntry]] object or undefined if name was not found in dictionary.
     */
    getEntry(poiName: string): PoiTableEntry | undefined;
    /**
     * Start to load the PoiTable from the specified URL. Can only be called once per table.
     *
     * @param {string} poiTableUrl URL that points to the JSON file.
     * @param {AbortSignal} abortSignal Signal to abort the loading of the poi table file
     *
     * @returns {Promise<boolean>} Promise is being resolved once the JSON file has been fetched and
     *          the `PoiTable` has been set up.
     */
    load(poiTableUrl: string, abortSignal?: AbortSignal): Promise<boolean>;
    private startLoading;
    private finishedLoading;
}
/**
 * The `PoiTableManager` manages the list of [[PoiTables]] that
 * can be defined in the {@link @arcadecity/arcade-map/datasource-protocol#Theme} sfile.
 */
declare class PoiTableManager {
    readonly mapView: MapView;
    private m_isLoading;
    private m_poiTables;
    private readonly m_abortControllers;
    /**
     * Creates an instance of PoiTableManager.
     * @param {MapView} mapView Owning {@link MapView}.
     */
    constructor(mapView: MapView);
    /**
     * Load the {@link PoiTable}s that are stored in the {@link MapView}s
     * {@link @arcadecity/arcade-map/datasource-protocol#Theme}.
     *
     * @remarks
     * Note that duplicate names of {@link PoiTable}s in the
     * {@link @arcadecity/arcade-map/datasource-protocol#Theme} will lead to inaccessible {@link PoiTable}s.
     *
     * @param poiTables - {@link @arcadecity/arcade-map/datasource-protocol#PoiTableRef[]}
     *                containing all {@link PoiTable}s to load.
     *
     * @returns Resolved once all the {@link PoiTable}s in
     *          the {@link @arcadecity/arcade-map/datasource-protocol#Theme} have been loaded.
     */
    loadPoiTables(poiTables?: PoiTableRef[]): Promise<void>;
    /**
     * Clear the list of {@link PoiTable}s.
     */
    clear(): void;
    /**
     * Return the map of {@link PoiTable}s.
     */
    get poiTables(): Map<string, PoiTable>;
    /**
     * Manually add a {@link PoiTable}. Normally, the [[PoiTables]]s
     * are specified in the {@link @arcadecity/arcade-map/datasource-protocol#Theme}.
     *
     * @remarks
     * Ensure that the name is unique.
     */
    addTable(poiTable: PoiTable): void;
    /**
     * Retrieve a {@link PoiTable} by name.
     *
     * @param {(string | undefined)} poiTableName Name of the {@link PoiTable}.
     *
     * @returns {(PoiTable | undefined)} The found [[poiTable]] if it could be found, `undefined`
     *          otherwise.
     */
    getPoiTable(poiTableName: string | undefined): PoiTable | undefined;
    /**
     * Return `true` if the {@link PoiTable}s have finished loading.
     *
     * @readonly
     */
    get finishedLoading(): boolean;
    private startLoading;
    private finishLoading;
}

/**
 * Collects results from a picking (intersection) test.
 *
 * @internal
 */
declare class PickListener {
    private readonly m_parameters?;
    private m_results;
    private m_sorted;
    private m_finished;
    /**
     * Constructs a new `PickListener`.
     *
     * @param m_parameters - Optional parameters to customize picking behaviour.
     */
    constructor(m_parameters?: IntersectParams | undefined);
    /**
     * Adds a pick result.
     *
     * @param result - The result to be added.
     */
    addResult(result: PickResult): void;
    /**
     * Indicates whether the listener is satisfied with the results already provided.
     * @returns `True` if the listener doesn't expect more results, `False` otherwise.
     */
    get done(): boolean;
    /**
     * Orders the collected results by distance first, then by reversed render order
     * (topmost/highest render order first), and limits the number of results to the maximum
     * accepted number, see {@link IntersectParams.maxResultCount}.
     */
    finish(): void;
    /**
     * Returns the collected results. {@link PickListener.finish} should be called first to ensure
     * the proper sorting and result count.
     * @returns The pick results.
     */
    get results(): PickResult[];
    /**
     * Returns the closest result collected so far, following the order documented in
     * {@link PickListener.finish}
     * @returns The closest pick result, or `undefined` if no result was collected.
     */
    get closestResult(): PickResult | undefined;
    /**
     * Returns the furthest result collected so far, following the order documented in
     * {@link PickListener.results}
     * @returns The furthest pick result, or `undefined` if no result was collected.
     */
    get furthestResult(): PickResult | undefined;
    private get maxResults();
    private sortResults;
}

/**
 * @hidden
 * Handles the projection of world coordinates to screen coordinates.
 */
declare class ScreenProjector {
    private m_camera;
    static tempV2: THREE$1.Vector2;
    static tempV3: THREE$1.Vector3;
    private m_width;
    private m_height;
    /**
     * Constructs a new `ScreenProjector`.
     *
     * @param m_camera - Camera to project against.
     */
    constructor(m_camera: THREE$1.Camera);
    /**
     * Height of the screen.
     */
    get width(): number;
    /**
     * Width of the screen.
     */
    get height(): number;
    /**
     * Apply current projectionViewMatrix of the camera to project the source vector into
     * screen coordinates.
     *
     * @param {(Vector3Like)} source The source vector to project.
     * @param {THREE.Vector2} target The target vector.
     * @returns {THREE.Vector2} The projected vector (the parameter 'target')
     */
    project(source: Vector3Like, target?: THREE$1.Vector2): THREE$1.Vector2 | undefined;
    /**
     * Apply current projectionViewMatrix of the camera to project the source vector into
     * screen coordinates.
     *
     * @param {(Vector3Like)} source The source vector to project.
     * @param {THREE.Vector2} target The target vector.
     * @returns {THREE.Vector2} The projected vector (the parameter 'target') or undefined if
     * outside of the near/far plane. The point may be outside the screen.
     */
    projectToScreen(source: Vector3Like, target?: THREE$1.Vector2): THREE$1.Vector2 | undefined;
    /**
     * Test if the area around the specified point is visible on the screen.
     *
     * @param {(Vector3Like)} source The centered source vector to project.
     * @param {(Number)} halfWidth Half of the width of the area in screen space [0..1].
     * @param {(Number)} halfHeight Half of the height of the area in screen space [0..1].
     * @param {THREE.Vector2} target The target vector.
     * @returns {THREE.Vector2} The projected vector (the parameter 'target') or undefined if
     * the area is completely outside the screen.
     */
    projectAreaToScreen(source: Vector3Like, halfWidth: number, halfHeight: number, target?: THREE$1.Vector2): THREE$1.Vector2 | undefined;
    /**
     * Apply current projectionViewMatrix of the camera to project the source vector into
     * screen coordinates. The z component between -1 and 1 is also returned.
     *
     * @param {(Vector3Like)} source The source vector to project.
     * @param {THREE.Vector3} target The target vector.
     * @returns {THREE.Vector3} The projected vector (the parameter 'target') or undefined if
     * outside the near / far plane.
     */
    project3(source: Vector3Like, target?: THREE$1.Vector3): THREE$1.Vector3 | undefined;
    /**
     * Apply current projectionViewMatrix of the camera to project the source vector. Stores
     * result in NDC in the target vector.
     *
     * @param {(Vector3Like)} source The source vector to project.
     * @param {THREE.Vector3} target The target vector.
     * @returns {THREE.Vector3} The projected vector (the parameter 'target').
     */
    projectVector(source: Vector3Like, target: THREE$1.Vector3): THREE$1.Vector3;
    /**
     * Fast test to check if projected point is on screen.
     *
     * @returns {boolean} `true` if point is on screen, `false` otherwise.
     */
    onScreen(source: Vector3Like): boolean;
    /**
     * Update the `ScreenProjector` with the latest values of the screen and the camera.
     *
     * @param {THREE.Camera} camera Camera to project against.
     * @param {number} width Width of screen/canvas.
     * @param {number} height Height of screen/canvas.
     */
    update(camera: THREE$1.Camera, width: number, height: number): void;
    private ndcToScreen;
}

declare namespace CameraUtils {
    /**
     * Returns the camera's focal length.
     * @beta
     *
     * @param camera - The camera.
     * @returns The focal length in pixels or `undefined` if not set.
     */
    function getFocalLength(camera: THREE$1.PerspectiveCamera): number | undefined;
    /**
     * Sets a camera's focal length.
     * @remarks The camera's vertical fov will be updated to achieve the given viewport height.
     * @beta
     *
     * @param camera
     * @param focalLength - Focal length in pixels. It must be larger than 0.
     * @param viewportHeight - Viewport height in pixels, used to compute vertical fov.
     * @returns The new camera's focal length in pixels.
     */
    function setFocalLength(camera: THREE$1.PerspectiveCamera, focalLength: number, viewportHeight: number): number;
    /**
     * Returns the camera's vertical field of view.
     * @param camera - The camera.
     * @returns The vertical fov in radians.
     */
    function getVerticalFov(camera: THREE$1.PerspectiveCamera): number;
    /**
     * Sets a camera's vertical fov.
     * @remarks The camera's focal length will be updated to achieve the given viewport height.
     * @beta
     *
     * @param camera
     * @param verticalFov - Vertical field of view in radians. It'll be clamped to
     *                      [{@link MIN_FOV_RAD}, {@link MAX_FOV_RAD}].
     * @param viewportHeight - Viewport height in pixels, used to compute focal length.
     * @returns The new camera's vertical fov in radians.
     */
    function setVerticalFov(camera: THREE$1.PerspectiveCamera, verticalFov: number, viewportHeight: number): number;
    /**
     * Calculates object's screen size based on the focal length and it's camera distance.
     * @beta
     *
     * @param focalLength - Focal length in pixels (see {@link setVerticalFov})
     * @param distance - Object distance in world space.
     * @param worldSize - Object size in world space.
     * @return object size in screen space.
     */
    function convertWorldToScreenSize(focalLength: number, distance: number, worldSize: number): number;
    /**
     * Calculates object's world size based on the focal length and it's camera distance.
     * @beta
     *
     * @param focalLength - Focal length in pixels (see {@link setVerticalFov})
     * @param distance - Object distance in world space.
     * @param screenSize - Object size in screen space.
     * @return object size in world space.
     */
    function convertScreenToWorldSize(focalLength: number, distance: number, screenSize: number): number;
    /**
     * Returns the camera's principal point (intersection of principal ray and image plane)
     * in NDC coordinates.
     * @beta
     * @see https://en.wikipedia.org/wiki/Pinhole_camera_model
     * @remarks This point coincides with the principal vanishing point. By default it's located at
     * the image center (NDC coords [0,0]), and the resulting projection is centered or symmetric.
     * But it may be offset (@see THREE.PerspectiveCamera.setViewOffset) for some use cases such as
     * multiview setups (e.g. stereoscopic rendering), resulting in an asymmetric perspective
     * projection.
     * @param camera - The camera.
     * @param result - Optional vector where the principal point coordinates will be copied.
     * @returns A vector containing the principal point NDC coordinates.
     */
    function getPrincipalPoint(camera: THREE$1.PerspectiveCamera, result?: Vector2Like): Vector2Like;
    /**
     * Sets the camera's principal point (intersection of principal ray and image plane)
     * in NDC coordinates.
     * @beta
     * @see {@link getPrincipalPoint}
     * @param camera - The camera.
     * @param ndcCoords - The principal point's NDC coordinates, each coordinate can have values in
     * the open interval (-1,1).
     */
    function setPrincipalPoint(camera: THREE$1.PerspectiveCamera, ndcCoords: Vector2Like): void;
    /**
     * Returns the camera's horizontal field of view.
     * @param camera - The camera.
     * @returns The horizontal fov in radians.
     */
    function getHorizontalFov(camera: THREE$1.PerspectiveCamera): number;
    /**
     * Returns top fov angle for a given perspective camera.
     * @beta
     * @remarks In symmetric projections, the principal point coincides with the image center, and
     * the vertical and horizontal FOVs are each split at that point in two equal halves.
     * However, in asymmetric projections the principal point is not at the image center, and thus
     * each fov is split unevenly in two parts:
     *
     *    Symmetric projection        Asymmetric projection
     * -------------------------   --------------------------
     * |           ^           |   |       ^                |
     * |           |           |   |       |tFov            |
     * |           |tFov       |   | lFov  v      rFov      |
     * |           |           |   |<----->x<-------------->|
     * |    lFov   v   rFov    |   |  ppal ^ point          |
     * |<--------->x<--------->|   |       |    o           |
     * | ppal point=img center |   |       | img center     |
     * |           ^           |   |       |                |
     * |           |bFov       |   |       |bFov            |
     * |           |           |   |       |                |
     * |           v           |   |       v                |
     * -------------------------   --------------------------
     *
     * @param camera - The camera.
     * @returns The top fov angle in radians.
     */
    function getTopFov(camera: THREE$1.PerspectiveCamera): number;
    /**
     * Returns bottom fov angle for a given perspective camera.
     * @see {@link CameraUtils.getTopFov}
     * @beta
     * @param camera - The camera.
     * @returns The bottom fov angle in radians.
     */
    function getBottomFov(camera: THREE$1.PerspectiveCamera): number;
    /**
     * Returns right fov angle for a given perspective camera.
     * @see {@link CameraUtils.getTopFov}
     * @beta
     * @param camera - The camera.
     * @returns The right fov angle in radians.
     */
    function getRightFov(camera: THREE$1.PerspectiveCamera): number;
    /**
     * Returns left fov angle for a given perspective camera.
     * @see {@link CameraUtils.getTopFov}
     * @beta
     * @param camera - The camera.
     * @returns The left fov angle in radians.
     */
    function getLeftFov(camera: THREE$1.PerspectiveCamera): number;
}

/**
 * @internal
 */
declare namespace Object3DUtils {
    /**
     * Describes estimated usage of memory on heap and GPU.
     */
    interface MemoryUsage {
        heapSize: number;
        gpuSize: number;
    }
    /**
     * Computes estimate for size of a THREE.Object3D object and its children. Shared materials
     * and/or attributes will be counted multiple times.
     *
     * @param object - The mesh object to evaluate
     * @param size - The {@link MemoryUsage} to update.
     * @param visitedObjects - Optional map to store large objects that could be shared.
     *
     * @returns Estimate of object size in bytes for heap and GPU.
     */
    function estimateSize(object: THREE$1.Object3D, parentSize?: MemoryUsage, visitedObjects?: Map<string, boolean>): MemoryUsage;
}

/**
 * MapView utilities: View transformations, camera setup, view bounds computation...
 */
declare namespace MapViewUtils {
    const MAX_TILT_DEG = 89;
    const MAX_TILT_RAD: number;
    /**
     * The anti clockwise rotation of an object along the axes of its tangent space, with itself
     * as origin.
     */
    interface Attitude {
        /**
         * Rotation of the object along its vertical axis.
         */
        yaw: number;
        /**
         * Rotation of the object along its horizontal axis.
         */
        pitch: number;
        /**
         * Rotation of the object along its forward axis.
         */
        roll: number;
    }
    /**
     * @deprecated
     */
    interface MemoryUsage extends Object3DUtils.MemoryUsage {
    }
    /**
     * Zooms and moves the map in such a way that the given target position remains at the same
     * position after the zoom.
     *
     * @param mapView - Instance of MapView.
     * @param targetNDCx - Target x position in NDC space.
     * @param targetNDCy - Target y position in NDC space.
     * @param zoomLevel - The desired zoom level.
     * @param maxTiltAngle - The maximum tilt angle to comply by, in globe projection, in radian.
     * @returns `false` if requested zoom cannot be achieved due to the map view's maximum bounds
     * {@link MapView.geoMaxBounds},`true` otherwise.
     */
    function zoomOnTargetPosition(mapView: MapView, targetNDCx: number, targetNDCy: number, zoomLevel: number, maxTiltAngle?: number): boolean;
    /**
     * Parameters for {@link orbitAroundScreenPoint}.
     */
    interface OrbitParams {
        /**
         * Delta azimuth in radians (default 0).
         */
        deltaAzimuth?: number;
        /**
         * Delta tilt in radians (default 0);
         */
        deltaTilt?: number;
        /**
         * Maximum tilt between the camera and its target in radians.
         */
        maxTiltAngle: number;
        /**
         * Orbiting center in NDC coordinates, defaults to camera's principal point.
         * @see {@link CameraUtils.getPrincipalPoint}.
         */
        center?: Vector2Like;
    }
    /**
     * Orbits the camera around a given point on the screen.
     *
     * @param mapView - The {@link MapView} instance to manipulate.
     * @param offsetX - Orbit point in NDC space.
     * @param offsetY - Orbit point in NDC space.
     * @param deltaAzimuth - Delta azimuth in radians.
     * @param deltaTilt - Delta tilt in radians.
     * @param maxTiltAngle - The maximum tilt between the camera and its target in radian.
     * @deprecated Use overload with {@link OrbitParams} object parameter.
     */
    function orbitAroundScreenPoint(mapView: MapView, offsetX: number, offsetY: number, deltaAzimuth: number, deltaTilt: number, maxTiltAngle: number): void;
    /**
     * Orbits the camera around a given point on the screen.
     *
     * @param mapView - The {@link MapView} instance to manipulate.
     * @param orbitParams - {@link OrbitParams}.
     */
    function orbitAroundScreenPoint(mapView: MapView, orbitParams: OrbitParams): void;
    /**
     * Calculate target (focus) point geo-coordinates for given camera.
     * @see getTargetPositionFromCamera
     *
     * @param camera - The camera looking on target point.
     * @param projection - The geo-projection used.
     * @param elevation - Optional elevation above (or below) sea level measured in world units.
     *
     * @deprecated This function is for internal use only and will be removed in the future. Use
     * MapView.worldTarget instead.
     */
    function getGeoTargetFromCamera(camera: THREE$1.Camera, projection: Projection, elevation?: number): GeoCoordinates | null;
    /**
     * Calculate target (focus) point world coordinates for given camera position and orientation.
     * @param camera - The camera looking on target point.
     * @param projection - The geo-projection used.
     * @param elevation - Optional elevation above (or below) sea level in world units.
     *
     * @deprecated This function is for internal use only and will be removed in the future.
     */
    function getWorldTargetFromCamera(camera: THREE$1.Camera, projection: Projection, elevation?: number): THREE$1.Vector3 | null;
    /**
     * Constrains given camera target and distance to {@link MapView.maxBounds}.
     *
     * @remarks
     * The resulting
     * target and distance will keep the view within the maximum bounds for a camera with tilt and
     * yaw set to 0.
     * @param target - The camera target.
     * @param distance - The camera distance.
     * @param mapView - The map view whose maximum bounds will be used as constraints.
     * @returns constrained target and distance, or the unchanged input arguments if the view
     * does not have maximum bounds set.
     */
    function constrainTargetAndDistanceToViewBounds(target: THREE$1.Vector3, distance: number, mapView: MapView): {
        target: THREE$1.Vector3;
        distance: number;
    };
    /**
     * @internal
     * Computes the target for a given camera and the distance between them.
     * @param projection - The world space projection.
     * @param camera - The camera whose target will be computed.
     * @param elevationProvider - If provided, elevation at the camera position will be used.
     * @returns The target, the distance to it and a boolean flag set to false in case an elevation
     * provider was passed but the elevation was not available yet.
     */
    function getTargetAndDistance(projection: Projection, camera: THREE$1.Camera, elevationProvider?: ElevationProvider): {
        target: THREE$1.Vector3;
        distance: number;
        final: boolean;
    };
    /**
     * Returns the {@link @arcadecity/arcade-map/geoutils#GeoCoordinates} of the camera,
     * given its target coordinates on the map and its
     * zoom, yaw and pitch.
     *
     * @param targetCoordinates - Coordinates of the center of the view.
     * @param distance - Distance to the target in meters.
     * @param yawDeg - Camera yaw in degrees.
     * @param pitchDeg - Camera pitch in degrees.
     * @param projection - Active MapView, needed to get the camera fov and map projection.
     * @param result - Optional output vector.
     * @returns Camera position in world space.
     */
    function getCameraPositionFromTargetCoordinates(targetCoordinates: GeoCoordinates, distance: number, yawDeg: number, pitchDeg: number, projection: Projection, result?: THREE$1.Vector3): THREE$1.Vector3;
    /**
     * @hidden
     * @internal
     *
     * Add offset to geo points for minimal view box in flat projection with tile wrapping.
     *
     * @remarks
     * In flat projection, with wrap around enabled, we should detect clusters of points around that
     * wrap antimeridian.
     *
     * Here, we fit points into minimal geo box taking world wrapping into account.
     */
    function wrapGeoPointsToScreen(points: GeoCoordLike[], startPosition?: GeoCoordinates): GeoCoordinates[];
    /**
     * @hidden
     * @internal
     *
     * Given `cameraPos`, force all points that lie on non-visible sphere half to be "near" max
     * possible viewable circle from given camera position.
     *
     * @remarks
     * Assumes that shpere projection with world center is in `(0, 0, 0)`.
     */
    function wrapWorldPointsToView(points: THREE$1.Vector3[], cameraPos: THREE$1.Vector3): void;
    /**
     * @hidden
     * @internal
     *
     * Return `GeoPoints` bounding {@link @arcadecity/arcade-map/geoutils#GeoBox}
     * applicable for {@link getFitBoundsDistance}.
     *
     * @returns {@link @arcadecity/arcade-map/geoutils#GeoCoordinates} set that covers `box`
     */
    function geoBoxToGeoPoints(box: GeoBox): GeoCoordinates[];
    /**
     * @hidden
     * @internal
     *
     * Get minimal distance required for `camera` looking at `worldTarget` to cover `points`.
     *
     * All dimensions belong to world space.
     *
     * @param points - points which must be in view.
     * @param worldTarget - readonly, world target of {@link MapView}
     * @param camera - readonly, camera with proper `position` and rotation set
     * @returns new distance to camera to be used with {@link (MapView.lookAt:WITH_PARAMS)}
     */
    function getFitBoundsDistance(points: THREE$1.Vector3[], worldTarget: THREE$1.Vector3, camera: THREE$1.PerspectiveCamera): number;
    /**
     * @hidden
     * @internal
     *
     * Paremeters for [[getFitBoundsLookAtParams]] function.
     */
    interface FitPointParams {
        tilt: number;
        heading: number;
        projection: Projection;
        minDistance: number;
        camera: THREE$1.PerspectiveCamera;
    }
    /**
     * @hidden
     * @internal
     *
     * Get {@link LookAtParams} that fit all `worldPoints`
     * giving that {@link MapView} will target at
     * `geoTarget`.
     *
     * @param geoTarget - desired target (see {@link MapView.target}) as geo point
     * @param worldTarget - same as `geoTarget` but in world space
     * @param worldPoints - points we want to see
     * @param params - other params derived from {@link MapView}.
     */
    function getFitBoundsLookAtParams(geoTarget: GeoCoordinates, worldTarget: THREE$1.Vector3, worldPoints: THREE$1.Vector3[], params: FitPointParams): {
        target: GeoCoordinates;
        distance: number;
        heading: number;
        tilt: number;
    };
    /**
     * @deprecated use getCameraPositionFromTargetCoordinates instead
     */
    function getCameraCoordinatesFromTargetCoordinates(targetCoordinates: GeoCoordinates, distance: number, yawDeg: number, pitchDeg: number, mapView: MapView): GeoCoordinates;
    /**
     * Casts a ray in NDC space from the current map view and returns the intersection point of that
     * ray wih the map in world space.
     *
     * @param mapView - Instance of MapView.
     * @param pointOnScreenXinNDC - X coordinate in NDC space.
     * @param pointOnScreenYinNDC - Y coordinate in NDC space.
     * @param elevation - Optional param used to offset the ground plane. Used when wanting to pan
     * based on a plane at some altitude. Necessary for example when panning with terrain.
     *
     * @returns Intersection coordinates, or `null` if raycast failed.
     */
    function rayCastWorldCoordinates(mapView: MapView | {
        camera: THREE$1.Camera;
        projection: Projection;
    }, pointOnScreenXinNDC: number, pointOnScreenYinNDC: number, elevation?: number): THREE$1.Vector3 | null;
    /**
     * Pans the camera according to the projection.
     *
     * @param mapView - Instance of MapView.
     * @param xOffset - In world space. Value > 0 will pan the map to the right, value < 0 will pan
     *                  the map to the left in default camera orientation.
     * @param yOffset - In world space. Value > 0 will pan the map upwards, value < 0 will pan the
     *                  map downwards in default camera orientation.
     */
    function panCameraAboveFlatMap(mapView: MapView, offsetX: number, offsetY: number): void;
    /**
     * The function doing a pan in the spherical space
     * when {@link MapView}'s active [[ProjectionType]]
     * is spherical. In other words, the function that rotates the camera around the globe.
     *
     * @param mapView - MapView instance.
     * @param fromWorld - Start vector representing the scene position of a geolocation.
     * @param toWorld - End vector representing the scene position of a geolocation.
     */
    function panCameraAroundGlobe(mapView: MapView, fromWorld: THREE$1.Vector3, toWorld: THREE$1.Vector3): void;
    /**
     * Rotates the camera by the given delta yaw and delta pitch. The pitch will be clamped to the
     * maximum possible tilt to the new target, and under the horizon in sphere projection.
     *
     * @param mapView - The {@link MapView} instance in use.
     * @param deltaYawDeg - Delta yaw in degrees.
     * @param deltaPitchDeg - Delta pitch in degrees.
     * @param maxTiltAngleRad - Max tilt angle in radians.
     */
    function rotate(mapView: {
        projection: Projection;
        camera: THREE$1.PerspectiveCamera;
    }, deltaYawDeg: number, deltaPitchDeg?: number, maxTiltAngleRad?: number): void;
    /**
     * Computes the rotation of the camera according to yaw and pitch in degrees. The computations
     * hinge on the current `projection` and `target`, because yaw and pitch are defined in
     * tangent space of the target point.
     *
     * **Note:** `yaw == 0 && pitch == 0` will north up the map and you will look downwards onto the
     * map.
     *
     * @param projection - Current projection.
     * @param target - The camera target.
     * @param yawDeg - Yaw in degrees, counter-clockwise (as opposed to azimuth), starting north.
     * @param pitchDeg - Pitch in degrees.
     */
    function getCameraRotationAtTarget(projection: Projection, target: GeoCoordinates, yawDeg: number, pitchDeg: number, result?: THREE$1.Quaternion): THREE$1.Quaternion;
    /**
     * Sets the rotation of the camera according to yaw and pitch in degrees. The computations hinge
     * on the current projection and `geoCenter`, because yaw and pitch are defined in tangent
     * space. In particular, `MapView#geoCenter` needs to be set before calling `setRotation`.
     *
     * **Note:** `yaw == 0 && pitch == 0` will north up the map and you will look downwards onto the
     * map.
     *
     * @param mapView - Instance of MapView.
     * @param yawDeg - Yaw in degrees, counter-clockwise (as opposed to azimuth), starting north.
     * @param pitchDeg - Pitch in degrees.
     */
    function setRotation(mapView: MapView, yawDeg: number, pitchDeg: number): void;
    /**
     * Extracts current camera tilt angle in radians.
     *
     * @param camera - The [[Camera]] in use.
     * @param projection - The {@link @arcadecity/arcade-map/geoutils#Projection} used to
     *                     convert between geo and world coordinates.
     *
     * @deprecated Use MapView.tilt
     */
    function extractCameraTilt(camera: THREE$1.Camera, projection: Projection): number;
    /**
     * Extracts yaw, pitch, and roll rotation in radians.
     * - Yaw : Rotation around the vertical axis, counter-clockwise (as opposed to azimuth),
     * starting north.
     * - Pitch :Rotation around the horizontal axis.
     * - Roll : Rotation around the view axis.
     *
     * @see https://en.wikipedia.org/wiki/Conversion_between_quaternions_and_Euler_angles
     *
     * @param options - Subset of necessary {@link MapView} properties.
     * @param object - The [[THREE.Object3D]] instance to extract the rotations from.
     */
    function extractAttitude(mapView: {
        projection: Projection;
    }, object: THREE$1.Object3D): Attitude;
    /**
     * Gets the spherical coordinates in radian of the object to the coordinates of `point`.
     *
     * Note: this method can be used to get the direction that an object points to, when `location`
     * is the target of that object, by adding PI to it. Otherwise it only returns the spherical
     * coordinates of `object` in the tangent space of `location`.
     *
     * @param mapView - The {@link MapView} instance to consider.
     * @param object - The object to get the coordinates from.
     * @param location - The reference point.
     */
    function extractSphericalCoordinatesFromLocation(mapView: {
        projection: Projection;
    }, object: THREE$1.Object3D, location: GeoCoordinatesLike | Vector3Like): {
        azimuth: number;
        tilt: number;
    };
    /**
     * Gets the tilt angle (in radians) of the object relative to the coordinates of `location`.
     *
     * Note: this method can be used to get the direction that an object points to, when `location`
     * is the target of that object, by adding PI to it. Otherwise it only returns the tilt angle
     * (in radians) of `object` in the tangent space of `location`.
     *
     * @param projection - The {@link @arcadecity/arcade-map/geoutils#Projection} used when
     *                     converting from geo to world coordinates.
     * @param object - The object to get the coordinates from.
     * @param location - The reference point.
     * @param tiltAxis - Optional axis used to define the rotation about which the object's tilt
     * occurs, the direction vector to the location from the camera is projected on the plane with
     * the given angle.
     */
    function extractTiltAngleFromLocation(projection: Projection, object: THREE$1.Object3D, location: GeoCoordinates | Vector3Like, tiltAxis?: THREE$1.Vector3): number;
    /**
     * Get perspective camera frustum planes distances.
     * @deprecated
     * @return all plane distances in helper object.
     */
    function getCameraFrustumPlanes(camera: THREE$1.PerspectiveCamera): {
        left: number;
        right: number;
        top: number;
        bottom: number;
        near: number;
        far: number;
    };
    /**
     * Casts a ray in NDC space from the current view of the camera and returns the intersection
     * point of that ray against the map in geo coordinates. The return value can be `null` when
     * the raycast is above the horizon.
     *
     * @param mapView - Instance of MapView.
     * @param pointOnScreenXNDC -  Abscissa in NDC space.
     * @param pointOnScreenYNDC -  Ordinate in NDC space.
     * @returns Intersection geo coordinates, or `null` if raycast is above the horizon.
     */
    function rayCastGeoCoordinates(mapView: MapView, pointOnScreenXinNDC: number, pointOnScreenYinNDC: number): GeoCoordinates | null;
    /**
     * Calculates and returns the distance from the ground, which is needed to put the camera to
     * this height, to see the size of the area that would be covered by one tile for the given zoom
     * level.
     *
     * @param mapView - Instance of MapView.
     * @param options - Subset of necessary {@link MapView} properties.
     */
    function calculateDistanceToGroundFromZoomLevel(mapView: {
        projection: Projection;
        focalLength: number;
        camera: THREE$1.PerspectiveCamera;
    }, zoomLevel: number): number;
    /**
     * Calculates and returns the distance to the target point.
     *
     * @param options - Necessary subset of MapView properties to compute the distance.
     * @param zoomLevel - The zoom level to get the equivalent height to.
     */
    function calculateDistanceFromZoomLevel(options: {
        focalLength: number;
    }, zoomLevel: number): number;
    /**
     * Calculates the zoom level, which corresponds to the current distance from
     * camera to lookAt point.
     * Therefore the zoom level is a `float` and not an `int`. The height of the camera can be in
     * between zoom levels. By setting the zoom level, you change the height position of the camera
     * in away that the field of view of the camera should be able to cover one tile for the given
     * zoom level.
     *
     * As an example for this, when you have a tile of zoom level 14 in front of the camera and you
     * set the zoom level of the camera to 14, then you are able to see the whole tile in front of
     * you.
     *
     * @param options - Subset of necessary {@link MapView} properties.
     * @param distance - The distance in meters, which are scene units in {@link MapView}.
     */
    function calculateZoomLevelFromDistance(options: {
        focalLength: number;
        minZoomLevel: number;
        maxZoomLevel: number;
    }, distance: number): number;
    /**
     * @deprecated
     * Translates a linear clip-space distance value to the actual value stored in the depth buffer.
     * This is useful as the depth values are not stored in the depth buffer linearly, and this can
     * lead into confusing behavior when not taken into account.
     *
     * @param clipDistance - Distance from the camera in clip space (range: [0, 1]).
     * @param camera - Camera applying the perspective projection.
     */
    function calculateDepthFromClipDistance(clipDistance: number, camera: THREE$1.Camera): number;
    /**
     * @deprecated
     * Translates a linear distance value [0..1], where 1 is the distance to the far plane, into
     * [0..cameraFar].
     *
     * @param distance - Distance from the camera (range: [0, 1]).
     * @param camera - Camera applying the perspective projection.
     */
    function cameraToWorldDistance(distance: number, camera: THREE$1.Camera): number;
    /**
     * @deprecated
     */
    function calculateVerticalFovByHorizontalFov(hFov: number, aspect: number): number;
    /**
     * @deprecated Use {@link CameraUtils.getHorizontalFov}.
     */
    function calculateHorizontalFovByVerticalFov(vFov: number, aspect: number): number;
    /**
     * @deprecated Use {@link CameraUtils.setVerticalFov}.
     */
    function calculateFocalLengthByVerticalFov(vFov: number, height: number): number;
    /**
     * @deprecated Use {@link CameraUtils.setFocalLength}.
     */
    function calculateFovByFocalLength(focalLength: number, height: number): number;
    /**
     * @deprecated Use {@link CameraUtils.convertWorldToScreenSize}.
     */
    const calculateScreenSizeByFocalLength: typeof CameraUtils.convertWorldToScreenSize;
    /**
     * @deprecated Use {@link CameraUtils.convertScreenToWorldSize}.
     */
    const calculateWorldSizeByFocalLength: typeof CameraUtils.convertScreenToWorldSize;
    /**
     * @deprecated
     */
    const estimateObject3dSize: typeof Object3DUtils.estimateSize;
    /**
     * Check if tiles or other content is currently being loaded.
     *
     * This method can be removed once HARP-7932 is implemented.
     *
     * @returns `true` if MapView has visible tiles or other content that is being loaded.
     */
    function mapViewIsLoading(mapView: MapView): boolean;
    function closeToFrustum(point: THREE$1.Vector3, camera: THREE$1.Camera, eps?: number): boolean;
    /**
     * @deprecated Use {@link @arcadecity/arcade-map/utils#DOMUtils.getBrowserLanguages}
     */
    const getBrowserLanguages: typeof DOMUtils.getBrowserLanguages;
}
declare namespace TileOffsetUtils {
    /**
     * @deprecated Use {@link @arcadecity/arcade-map/geoutils#TileKeyUtils.getKeyForTileKeyAndOffset}.
     */
    const getKeyForTileKeyAndOffset: typeof TileKeyUtils.getKeyForTileKeyAndOffset;
    /**
     * @deprecated Use {@link @arcadecity/arcade-map/geoutils#TileKeyUtils.getKeyForTileKeyAndOffset}.
     */
    const extractOffsetAndMortonKeyFromKey: typeof TileKeyUtils.extractOffsetAndMortonKeyFromKey;
    /**
     * @deprecated Use {@link @arcadecity/arcade-map/geoutils#TileKeyUtils.getParentKeyFromKey}.
     */
    const getParentKeyFromKey: typeof TileKeyUtils.getParentKeyFromKey;
}

/**
 * Represents a unique TileKey and the area it takes up on screen.
 *
 * Note, in certain tiling projections, it is possible to have an offset, which represents a tile
 * which has fully wrapped around, hence this defaults to 0 to simplify usage for projections which
 * don't require it.
 */
declare class TileKeyEntry {
    tileKey: TileKey;
    area: number;
    offset: number;
    elevationRange?: ElevationRange | undefined;
    distance: number;
    constructor(tileKey: TileKey, area: number, offset?: number, elevationRange?: ElevationRange | undefined, distance?: number);
}
/**
 * Map tile keys to TileKeyEntry.
 * Keys are a combination of morton code and tile offset,
 * see [[TileOffsetUtils.getKeyForTileKeyAndOffset]].
 */
declare type TileKeyEntries = Map<number, TileKeyEntry>;
/**
 * Map zoom level to map of visible tile key entries
 */
declare type ZoomLevelTileKeyMap = Map<number, TileKeyEntries>;
/**
 * Result of frustum intersection
 */
interface IntersectionResult {
    /**
     * Tiles intersected by the frustum per zoom level.
     */
    readonly tileKeyEntries: ZoomLevelTileKeyMap;
    /**
     * True if the intersection was calculated using precise elevation data, false if it's an
     * approximation.
     */
    calculationFinal: boolean;
}
/**
 * Computes the tiles intersected by the frustum defined by the current camera setup.
 */
declare class FrustumIntersection {
    private readonly m_camera;
    readonly mapView: MapView;
    private readonly m_extendedFrustumCulling;
    private readonly m_tileWrappingEnabled;
    private readonly m_enableMixedLod;
    private readonly m_tilePixelSize;
    private readonly m_frustum;
    private readonly m_viewProjectionMatrix;
    private readonly m_mapTileCuller;
    private m_rootTileKeys;
    private readonly m_tileKeyEntries;
    constructor(m_camera: THREE$1.PerspectiveCamera, mapView: MapView, m_extendedFrustumCulling: boolean, m_tileWrappingEnabled: boolean, m_enableMixedLod: boolean, m_tilePixelSize?: number);
    /**
     * Return camera used for generating frustum.
     */
    get camera(): THREE$1.PerspectiveCamera;
    /**
     * Return projection used to convert geo coordinates to world coordinates.
     */
    get projection(): Projection;
    /**
     * Updates the frustum to match the current camera setup.
     */
    updateFrustum(projectionMatrixOverride?: THREE$1.Matrix4): void;
    /**
     * Computes the tiles intersected by the updated frustum, see [[updateFrustum]].
     *
     * @param tilingScheme - The tiling scheme used to generate the tiles.
     * @param elevationRangeSource - Source of elevation range data if any.
     * @param zoomLevels - A list of zoom levels to render.
     * @param dataSources - A list of data sources to render.
     * @returns The computation result, see [[FrustumIntersection.Result]].
     */
    compute(tilingScheme: TilingScheme, elevationRangeSource: ElevationRangeSource | undefined, zoomLevels: number[], dataSources: DataSource[]): IntersectionResult;
    private getTileKeyEntry;
    /**
     * Estimate screen space area of tile and distance to center of tile
     * @param tileBounds - The bounding volume of a tile
     * @return Area estimate and distance to tile center in clip space
     */
    private computeTileAreaAndDistance;
    /**
     * Create a list of root nodes to test against the frustum. The root nodes each start at level 0
     * and have an offset (see {@link Tile}) based on:
     * - the current position [[worldCenter]].
     * - the height of the camera above the world.
     * - the field of view of the camera (the maximum value between the horizontal / vertical
     *   values)
     * - the tilt of the camera (because we see more tiles when tilted).
     *
     * @param worldCenter - The center of the camera in world space.
     */
    private computeRequiredInitialRootTileKeys;
}

/**
 * Way the memory consumption of a tile is computed. Either in number of tiles, or in MegaBytes. If
 * it is in MB, an estimation is used.
 */
declare enum ResourceComputationType {
    EstimationInMb = 0,
    NumberOfTiles = 1
}
/**
 * Limited set of {@link MapViewOptions} used for {@link VisibleTileSet}.
 */
interface VisibleTileSetOptions {
    /**
     * The projection of the view.
     */
    projection: Projection;
    /**
     * User-defined camera clipping planes evaluator.
     */
    clipPlanesEvaluator: ClipPlanesEvaluator;
    /**
     * Limit of tiles that can be visible per datasource.
     */
    maxVisibleDataSourceTiles: number;
    /**
     * In addition to the simple frustum culling also do additional checks with [[MapTileCuller]].
     */
    extendedFrustumCulling: boolean;
    /**
     * Missing Typedoc
     */
    tileCacheSize: number;
    /**
     * Missing Typedoc
     */
    resourceComputationType: ResourceComputationType;
    /**
     * Number of levels to go up when searching for fallback tiles.
     */
    quadTreeSearchDistanceUp: number;
    /**
     * Number of levels to go down when searching for fallback tiles.
     */
    quadTreeSearchDistanceDown: number;
    /**
     * Maximal number of new tiles, that can be added to the scene per frame.
     * if set to `0`the limit will be ignored and all available tiles be uploaded.
     * @beta
     * @internal
     * @defaultValue 0
     */
    maxTilesPerFrame: number;
}
/**
 * List of visible tiles for a {@link DataSource}.
 */
interface DataSourceTileList {
    /**
     * The datasource that was producing the tiles.
     */
    dataSource: DataSource;
    /**
     * The current {@link MapView} zoom level.
     */
    zoomLevel: number;
    /**
     * The storage level of the visibleTiles.
     * Note: renderedTiles might contain tiles from different levels.
     */
    storageLevel: number;
    /**
     * True if all [[visibleTiles]] are loaded.
     */
    allVisibleTileLoaded: boolean;
    /**
     * The number of tiles which are still loading.
     */
    numTilesLoading: number;
    /**
     * List of tiles we want to render (i.e. the tiles computed from the zoom level and view
     * frustum). However some might not be renderable yet (e.g. loading). See [[renderedTiles]] for
     * the actual list of tiles that the user will see.
     */
    visibleTiles: Tile[];
    /**
     * Map of tiles that will be rendered, key is the the combination of tile key and offset, see
     * [[getKeyForTileKeyAndOffset]]. This includes tiles that are not in the [[visibleTiles]]
     * list but that are used as fallbacks b/c they are still in the cache.
     */
    renderedTiles: Map<number, Tile>;
}
/**
 * Manages visible {@link Tile}s for {@link MapView}.
 *
 * Responsible for election of rendered tiles:
 *  - quad-tree traversal
 *  - frustum culling
 *  - sorting tiles by relevance (visible area) to prioritize load
 *  - limiting number of visible tiles
 *  - caching tiles
 *  - searching cache to replace visible but yet empty tiles with already loaded siblings in nearby
 *    zoom levels
 */
declare class VisibleTileSet {
    private readonly m_frustumIntersection;
    private readonly m_tileGeometryManager;
    options: VisibleTileSetOptions;
    private readonly m_taskQueue;
    dataSourceTileList: DataSourceTileList[];
    allVisibleTilesLoaded: boolean;
    private readonly m_cameraOverride;
    private readonly m_dataSourceCache;
    private m_viewRange;
    private readonly m_coveringMap;
    private m_resourceComputationType;
    constructor(m_frustumIntersection: FrustumIntersection, m_tileGeometryManager: TileGeometryManager, options: VisibleTileSetOptions, m_taskQueue: TaskQueue);
    /**
     * Returns cache size.
     */
    getDataSourceCacheSize(): number;
    /**
     * Sets cache size.
     *
     * @param size - cache size
     * @param computationType - Optional value specifying the way a {@link Tile}s cache usage is
     *      computed, either based on size in MB (mega bytes) or in number of tiles. Defaults to
     *      `ResourceComputationType.EstimationInMb`.
     */
    setDataSourceCacheSize(size: number, computationType?: ResourceComputationType): void;
    /**
     * Retrieves maximum number of visible tiles.
     */
    getNumberOfVisibleTiles(): number;
    /**
     * Sets maximum number of visible tiles.
     *
     * @param size - size of visible tiles array
     */
    setNumberOfVisibleTiles(size: number): void;
    /**
     * Gets the maximum number of tiles that can be added to the scene per frame
     * @beta
     * @internal
     */
    get maxTilesPerFrame(): number;
    /**
     * Gets the maximum number of tiles that can be added to the scene per frame
     * @beta
     * @internal
     * @param value
     */
    set maxTilesPerFrame(value: number);
    /**
     * The way the cache usage is computed, either based on size in MB (mega bytes) or in number of
     * tiles.
     */
    get resourceComputationType(): ResourceComputationType;
    /**
     * Sets the way tile cache is managing its elements.
     *
     * Cache may be either keeping number of elements stored or the memory consumed by them.
     *
     * @param computationType - Type of algorith used in cache for checking full saturation,
     * may be counting number of elements or memory consumed by them.
     */
    set resourceComputationType(computationType: ResourceComputationType);
    /**
     * Evaluate frustum near/far clip planes and visibility ranges.
     */
    updateClipPlanes(maxElevation?: number, minElevation?: number): ViewRanges;
    /**
     * Calculates a new set of visible tiles.
     * @param storageLevel - The camera storage level, see {@link MapView.storageLevel}.
     * @param zoomLevel - The camera zoom level.
     * @param dataSources - The data sources for which the visible tiles will be calculated.
     * @param elevationRangeSource - Source of elevation range data if any.
     * @returns view ranges and their status since last update (changed or not).
     */
    updateRenderList(storageLevel: number, zoomLevel: number, dataSources: DataSource[], frameNumber: number, elevationRangeSource?: ElevationRangeSource): {
        viewRanges: ViewRanges;
        viewRangesChanged: boolean;
    };
    /**
     * Gets the tile corresponding to the given data source, key and offset, creating it if
     * necessary.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param tileKey - The key identifying the tile.
     * @param offset - Tile offset.
     * @param frameNumber - Frame in which the tile was requested
     * @return The tile if it was found or created, undefined otherwise.
     */
    getTile(dataSource: DataSource, tileKey: TileKey, offset: number, frameNumber: number): Tile | undefined;
    /**
     * Gets the tile corresponding to the given data source, key and offset from the cache.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param tileKey - The key identifying the tile.
     * @param offset - Tile offset.
     * @param frameNumber - Frame in which the tile was requested
     * @return The tile if found in cache, undefined otherwise.
     */
    getCachedTile(dataSource: DataSource, tileKey: TileKey, offset: number, frameNumber: number): Tile | undefined;
    /**
     * Gets the tile corresponding to the given data source, key and offset from the rendered tiles.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param tileKey - The key identifying the tile.
     * @param offset - Tile offset.
     * @return The tile if found among the rendered tiles, undefined otherwise.
     */
    getRenderedTile(dataSource: DataSource, tileKey: TileKey, offset?: number): Tile | undefined;
    /**
     * Gets the tile corresponding to the given data source and location from the rendered tiles.
     *
     * @param dataSource - The data source the tile belongs to.
     * @param geoPoint - The geolocation included within the tile.
     * @return The tile if found among the rendered tiles, undefined otherwise.
     */
    getRenderedTileAtLocation(dataSource: DataSource, geoPoint: GeoCoordinates, offset?: number): Tile | undefined;
    /**
     * Removes all internal bookkeeping entries and cache related to specified datasource.
     *
     * Called by {@link MapView} when {@link DataSource} has been removed from {@link MapView}.
     */
    removeDataSource(dataSource: DataSource): void;
    /**
     * Clear the tile cache.
     *
     * Remove the {@link Tile} objects created by cacheable {@link DataSource}.
     * If a {@link DataSource} name is
     * provided, this method restricts the eviction
     * the {@link DataSource} with the given name.
     *
     * @param dataSourceName - The name of the {@link DataSource}.
     * @param filter Optional tile filter
     */
    clearTileCache(dataSource?: DataSource, filter?: (tile: Tile) => boolean): void;
    /**
     * Visit each tile in visible, rendered, and cached sets.
     *
     *  * Visible and temporarily rendered tiles will be marked for update and retained.
     *  * Cached but not rendered/visible will be evicted.
     *
     * @param dataSource - If passed, only the tiles from this {@link DataSource} instance
     *      are processed. If `undefined`, tiles from all {@link DataSource}s are processed.
     * @param filter Optional tile filter
     */
    markTilesDirty(dataSource?: DataSource, filter?: (tile: Tile) => boolean): void;
    /**
     * Dispose tiles that are marked for removal by {@link @arcadecity/arcade-map/lrucache#LRUCache} algorithm.
     */
    disposePendingTiles(): void;
    /**
     * Process callback function [[fun]] with each visible tile in set.
     *
     * @param fun - The callback function to be called.
     */
    forEachVisibleTile(fun: (tile: Tile) => void): void;
    /**
     * Process callback function [[fun]] with each tile in the cache.
     *
     * Optional [[dataSource]] parameter limits processing to the tiles that belongs to
     * DataSource passed in.
     *
     * @param fun - The callback function to be called.
     * @param dataSource - The optional DataSource reference for tiles selection.
     */
    forEachCachedTile(fun: (tile: Tile) => void, dataSource?: DataSource): void;
    /**
     * Dispose a `Tile` from cache, 'dispose()' is also called on the tile to free its resources.
     */
    disposeTile(tile: Tile): void;
    private processVisibleTiles;
    private processDelayTileRendering;
    /**
     * Skips rendering of tiles that are overlapped. The overlapping {@link Tile} comes from a
     * {@link DataSource} which is fully covering, i.e. there it is fully opaque.
     **/
    private skipOverlappedTiles;
    private getSearchDirection;
    /**
     * Populates the list of tiles to render, see "renderedTiles". Tiles that are loaded and which
     * are an exact match are added straight to the list, tiles that are still loading are replaced
     * with tiles in the cache that are either a parent or child of the requested tile. This helps
     * to prevent flickering when zooming in / out. The distance to search is based on the options
     * [[quadTreeSearchDistanceDown]] and [[quadTreeSearchDistanceUp]].
     *
     * Each {@link DataSource} can also switch this behaviour on / off using the
     * [[allowOverlappingTiles]] flag.
     *
     */
    private populateRenderedTiles;
    private findDown;
    /**
     * Returns true if a tile was found in the cache which is a parent
     * @param tileKeyCode - Morton code of the current tile that should be searched for.
     * @param dataZoomLevel - The current data zoom level of tiles that are to be displayed.
     * @param renderedTiles - The list of tiles that are shown to the user.
     * @param checkedTiles - Used to map a given code to a boolean which tells us if an ancestor is
     * displayed or not.
     * @param dataSource - The provider of tiles.
     * @returns Whether a parent tile exists.
     */
    private findUp;
    private getTileImpl;
    private addToTaskQueue;
    private markDataSourceTilesDirty;
    private getVisibleTileKeysForDataSources;
}

declare class TextCanvasFactory {
    private readonly m_renderer;
    private m_minGlyphCount;
    private m_maxGlyphCount;
    /**
     * Creates an instance of text canvas factory.
     * @param m_renderer -
     */
    constructor(m_renderer: THREE.WebGLRenderer);
    setGlyphCountLimits(min: number, max: number): void;
    /**
     * Creates text canvas
     * @param fontCatalog - Initial [[FontCatalog]].
     * @param name - Optional name for the TextCavas
     */
    createTextCanvas(fontCatalog: FontCatalog, name?: string): TextCanvas;
}

interface TextElementsRendererOptions {
    /**
     * The path to the font catalog file.
     */
    fontCatalog?: string;
    /**
     * Optional initial number of glyphs (characters) for labels. In situations with limited,
     * available memory, decreasing this number may be beneficial.
     *
     * @default [[MIN_GLYPH_COUNT]]
     */
    minNumGlyphs?: number;
    /**
     * Optional limit of number of glyphs (characters) for labels. In situations with limited,
     * available memory, decreasing this number may be beneficial.
     *
     * @default [[MAX_GLYPH_COUNT]]
     */
    maxNumGlyphs?: number;
    /**
     * Limits the number of {@link DataSource} labels visible, such as road names and POIs.
     * On small devices, you can reduce this number to to increase performance.
     * @default `undefined` (no limit).
     */
    maxNumVisibleLabels?: number;
    /**
     * The maximum distance for {@link TextElement} to be rendered, expressed as a fraction of
     * the distance between the near and far plane [0, 1.0].
     * @default [[DEFAULT_MAX_DISTANCE_RATIO_FOR_LABELS]].
     */
    maxDistanceRatioForTextLabels?: number;
    /**
     * The maximum distance for {@link TextElement} with icons to be rendered,
     * expressed as a fraction of the distance
     * between the near and far plane [0, 1.0].
     * @default [[DEFAULT_MAX_DISTANCE_RATIO_FOR_LABELS]].
     */
    maxDistanceRatioForPoiLabels?: number;
    /**
     * The minimum scaling factor that may be applied to {@link TextElement}s due to their distance.
     * If not defined the default value specified in {@link TextElementsRenderer} will be used.
     * @default [[DEFAULT_LABEL_DISTANCE_SCALE_MIN]].
     */
    labelDistanceScaleMin?: number;
    /**
     * The maximum scaling factor that may be applied to {@link TextElement}s due to their distance.
     * If not defined the default value specified in {@link TextElementsRenderer} will be used.
     * @default [[DEFAULT_LABEL_DISTANCE_SCALE_MAX]].
     */
    labelDistanceScaleMax?: number;
    /**
     * Disable all fading animations for debugging and performance measurement.
     * @default `false`
     */
    disableFading?: boolean;
    /**
     * Enable that new labels are delayed until movement is finished
     * @default `true`
     */
    delayLabelsUntilMovementFinished?: boolean;
    /**
     * If `true`, a replacement glyph ("?") is rendered for every missing glyph.
     * @default `false`
     */
    showReplacementGlyphs?: boolean;
    /**
     * The maximum distance to the screen border as a fraction of screen size [0..1].
     * @default [[DEFAULT_MAX_DISTANCE_TO_BORDER]].
     */
    maxPoiDistanceToBorder?: number;
    /**
     * An optional canvas element that renders 2D collision debug information.
     */
    collisionDebugCanvas?: HTMLCanvasElement;
}

/**
 * {@link TextElementsRenderer} representation of a
 * {@link @arcadecity/arcade-map/datasource-protocol#Theme}'s TextStyle.
 */
interface TextElementStyle {
    name: string;
    fontCatalog?: string;
    renderParams: TextRenderParameters;
    layoutParams: TextLayoutParameters;
    textCanvas?: TextCanvas;
}
declare class TextStyleCache {
    private readonly m_textStyles;
    private m_defaultStyle;
    constructor();
    updateTextStyles(textStyleDefinitions?: TextStyleDefinition[], defaultTextStyleDefinition?: TextStyleDefinition): void;
    updateTextCanvases(textCanvases: TextCanvases): void;
    /**
     * Retrieves a {@link TextElementStyle} for {@link @arcadecity/arcade-map/datasource-protocol#Theme}'s
     * [[TextStyle]] id.
     */
    getTextElementStyle(styleId?: string): TextElementStyle;
    /**
     * Gets the appropriate {@link @arcadecity/arcade-map/text-canvas#TextRenderStyle}
     * to use for a label. Depends heavily on the label's
     * [[Technique]] and the current zoomLevel.
     */
    createRenderStyle(tile: Tile, technique: TextTechnique | PoiTechnique | LineMarkerTechnique): TextRenderStyle;
    /**
     * Create the appropriate {@link @arcadecity/arcade-map/text-canvas#TextLayoutStyle}
     * to use for a label. Depends heavily on the label's
     * [[Technique]] and the current zoomLevel.
     *
     * @param tile - The {@link Tile} to process.
     * @param technique - Label's technique.
     */
    createLayoutStyle(tile: Tile, technique: TextTechnique | PoiTechnique | LineMarkerTechnique): TextLayoutStyle;
    private updateDefaultTextStyle;
    private initializeTextCanvas;
    private createTextElementStyle;
}

/**
 * State parameters of a view that are required by the text renderer.
 */
interface ViewState {
    worldCenter: THREE.Vector3;
    cameraIsMoving: boolean;
    maxVisibilityDist: number;
    zoomLevel: number;
    env: Env;
    frameNumber: number;
    lookAtVector: THREE.Vector3;
    lookAtDistance: number;
    isDynamic: boolean;
    hiddenGeometryKinds?: GeometryKindSet;
    renderedTilesChanged: boolean;
    projection: Projection;
    elevationProvider?: ElevationProvider;
}

declare type TextCanvases = Map<string, TextCanvas | undefined>;
declare const DEFAULT_FONT_CATALOG_NAME = "default";
/**
 * Default distance scale. Will be applied if distanceScale is not defined in the technique.
 * Defines the scale that will be applied to labeled icons (icon and text) in the distance.
 * @internal
 */
declare const DEFAULT_TEXT_DISTANCE_SCALE = 0.5;
/**
 *
 * Internal class to manage all text rendering.
 */
declare class TextElementsRenderer {
    private readonly m_viewState;
    private readonly m_screenProjector;
    private readonly m_poiManager;
    private m_renderer;
    private readonly m_imageCaches;
    private m_loadPromisesCount;
    private m_loadPromise;
    private readonly m_options;
    private readonly m_textCanvases;
    private m_overlayTextElements?;
    private m_debugGlyphTextureCacheMesh?;
    private m_debugGlyphTextureCacheWireMesh?;
    private readonly m_tmpVector;
    private readonly m_tmpVector3;
    private readonly m_cameraLookAt;
    private m_overloaded;
    private m_cacheInvalidated;
    private m_addNewLabels;
    private m_forceNewLabelsPass;
    private readonly m_textElementStateCache;
    private readonly m_camera;
    private m_defaultFontCatalogConfig;
    private m_poiRenderer;
    private readonly m_textStyleCache;
    private readonly m_screenCollisions;
    private readonly m_textCanvasFactory;
    /**
     * indicates if the TextElementsRenderer is still updating, includes fading, elevations etc
     */
    private m_isUpdatePending;
    /**
     * Create the `TextElementsRenderer` which selects which labels should be placed on screen as
     * a preprocessing step, which is not done every frame, and also renders the placed
     * {@link TextElement}s every frame.
     *
     * @param m_viewState - State of the view for which this renderer will draw text.
     * @param m_screenProjector - Projects 3D coordinates into screen space.
     * @param m_poiManager - To prepare pois for rendering.
     * @param m_renderer - The renderer to be used.
     * @param m_imageCaches - The Image Caches to look for Icons.
     * @param options - Configuration options for the text renderer. See
     * @param textCanvasFactory - Optional A TextCanvasFactory to override the default.
     * @param poiRenderer - Optional A PoiRenderer to override the default.
     * @param screenCollisions - Optional  ScreenCollisions to override the default.
     * [[TextElementsRendererOptions]].
     */
    constructor(m_viewState: ViewState, m_screenProjector: ScreenProjector, m_poiManager: PoiManager, m_renderer: THREE$1.WebGLRenderer, m_imageCaches: MapViewImageCache[], options: TextElementsRendererOptions, textCanvasFactory?: TextCanvasFactory, poiRenderer?: PoiRenderer, screenCollisions?: ScreenCollisions);
    /**
     * Disable all fading animations (for debugging and performance measurement). Defaults to
     * `false`.
     */
    set disableFading(disable: boolean);
    get disableFading(): boolean;
    get styleCache(): TextStyleCache;
    get delayLabelsUntilMovementFinished(): boolean;
    set delayLabelsUntilMovementFinished(delay: boolean);
    /**
     * If `true`, a replacement glyph ("?") is rendered for every missing glyph.
     */
    get showReplacementGlyphs(): boolean;
    /**
     * If `true`, a replacement glyph ("?") is rendered for every missing glyph.
     */
    set showReplacementGlyphs(value: boolean);
    restoreRenderers(renderer: THREE$1.WebGLRenderer): void;
    /**
     * Updates the FontCatalogs used by this {@link TextElementsRenderer}.
     *
     * @param fontCatalogs - The new list of {@link FontCatalogConfig}s
     */
    updateFontCatalogs(fontCatalogs?: FontCatalogConfig[]): Promise<void>;
    updateTextStyles(textStyles?: TextStyleDefinition[], defaultTextStyle?: TextStyleDefinition): Promise<void>;
    /**
     * Render the text using the specified camera into the current canvas.
     *
     * @param camera - Orthographic camera to use.
     */
    renderText(farPlane: number): void;
    /**
     * Forces update of text elements in the next call to [[placeText]].
     */
    invalidateCache(): void;
    /**
     * Notify `TextElementsRenderer` that the camera has started a movement.
     */
    movementStarted(): void;
    /**
     * Notify `TextElementsRenderer` that the camera has finished its movement.
     */
    movementFinished(): void;
    /**
     * Is `true` if number of {@link TextElement}s in visible tiles is larger than the recommended
     * number `OVERLOAD_LABEL_LIMIT`.
     */
    get overloaded(): boolean;
    /**
     * Places text elements for the current frame.
     * @param dataSourceTileList - List of tiles to be rendered for each data source.
     * @param time - Current frame time.
     */
    placeText(dataSourceTileList: DataSourceTileList[], time: number): void;
    /**
     * Adds new overlay text elements to this `MapView`.
     *
     * @param textElements - Array of {@link TextElement} to be added.
     */
    addOverlayText(textElements: TextElement[]): void;
    /**
     * Adds new overlay text elements to this `MapView`.
     *
     * @param textElements - Array of {@link TextElement} to be added.
     */
    clearOverlayText(): void;
    /**
     * @returns Whether there's overlay text to be rendered.
     */
    hasOverlayText(): boolean;
    get overlayText(): TextElement[] | undefined;
    /**
     * Fill the picking results for the pixel with the given screen coordinate. If multiple
     * {@link TextElement}s are found, the order of the results is unspecified.
     *
     * Note: {@link TextElement}s with identical `featureId` or
     * identical `userData` will only appear
     * once in the list `pickResults`.
     *
     * @param screenPosition - Screen coordinate of picking position.
     * @param pickResults - Array filled with pick results.
     */
    pickTextElements(screenPosition: THREE$1.Vector2, pickListener: PickListener): void;
    /**
     * `true` if any resource used by any `FontCatalog` is still loading.
     */
    get loading(): boolean;
    /**
     * `true` if TextElements are not placed finally but are still updating, including fading or
     * waiting for elevation.
     */
    get isUpdatePending(): boolean;
    /**
     * Waits till all pending resources from any `FontCatalog` are loaded.
     */
    waitLoaded(): Promise<void>;
    /**
     * Reset the current text render states of all visible tiles.
     *
     * @remarks
     * All {@link TextElement}s will fade in
     * after that as if they have just been added.
     */
    clearRenderStates(): void;
    /**
     * Return memory used by all objects managed by `TextElementsRenderer`.
     *
     * @returns `MemoryUsage` Heap and GPU memory used by this `TextElementsRenderer`.
     */
    getMemoryUsage(): MapViewUtils.MemoryUsage;
    private addDefaultTextCanvas;
    /**
     * Reset internal state at the beginning of a frame.
     */
    private reset;
    /**
     * Fills the screen with lines projected from world space, see [[Tile.blockingElements]].
     * @note These boxes have highest priority, so will block all other labels.
     * @param dataSourceTileList - List of tiles to be rendered for each data source.
     */
    private prepopulateScreenWithBlockingElements;
    /**
     * @returns True if whole group was processed for placement,
     * false otherwise (e.g. placement limit reached).
     */
    private placeTextElementGroup;
    private initializeGlyphs;
    private initializeCamera;
    updateCamera(): void;
    private initializeDefaultFontCatalog;
    private addTextCanvas;
    private updateGlyphDebugMesh;
    private initializeGlyphDebugMesh;
    /**
     * Visit all visible tiles and add/ their text elements to cache.
     *
     * @remarks
     * The update of {@link TextElement}s is a time consuming process,
     * and cannot be done every frame, but should only
     * be done when the camera moved (a lot) of whenever the set of visible tiles change.
     *
     * The actually rendered {@link TextElement}s are stored internally
     * until the next update is done
     * to speed up rendering when no camera movement was detected.
     * @param dataSourceTileList - List of tiles to be rendered for each data source.
     */
    private updateTextElements;
    private updateTextElementsFromSource;
    private prepareTextElementGroup;
    private createSortedGroupsForSorting;
    private selectTextElementsToUpdateByDistance;
    private placeTextElements;
    private placeNewTextElements;
    private placeOverlayTextElements;
    private getDistanceScalingFactor;
    private getDistanceFadingFactor;
    private addPointLabel;
    private addPoiLabel;
    private addLineMarkerLabel;
    private addPathLabel;
    private checkIfOverloaded;
    /**
     * Project point to screen and check if it is on screen or within a fixed distance to the
     * border.
     *
     * @param point center point of label.
     * @param outPoint projected screen point of label.
     */
    private labelPotentiallyVisible;
}

declare enum TileTaskGroups {
    FETCH_AND_DECODE = "fetch",
    CREATE = "create"
}
interface MapViewOptions {
    /**
     * If `true`adds a Background Mesh for each tile
     *
     * @default `true`
     */
    addBackgroundDatasource?: boolean;
    /**
     * Set tiling scheme for [[BackgroundDataSource]]
     */
    backgroundTilingScheme?: TilingScheme;
    camera?: THREE$1.PerspectiveCamera;
    /**
     * The canvas element used to render the scene (unless we pass in a renderer)
     */
    canvas?: HTMLCanvasElement;
    /**
     * User-defined camera clipping planes distance evaluator.
     * If not defined, {@link TiltViewClipPlanesEvaluator} will be used by {@link MapView}.
     *
     * @default {@link TiltViewClipPlanesEvaluator}
     */
    clipPlanesEvaluator?: ClipPlanesEvaluator;
    /**
     * Antialias settings for the map rendering. It is better to disable the native antialiasing if
     * the custom antialiasing is enabled.
     */
    customAntialiasSettings?: IMapAntialiasSettings;
    /**
     * The number of Web Workers used to decode data. The default is
     * CLAMP(`navigator.hardwareConcurrency` - 1, 1, 2).
     */
    decoderCount?: number;
    /**
     * The URL of the script that the decoder worker runs. The default URL is
     * `./decoder.bundle.js`.
     *
     * Relative URIs are resolved to full URL using the document's base URL
     * (see: https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2).
     */
    decoderUrl?: string;
    /**
     * Set fixed pixel ratio for rendering when the camera is moving or an animation is running.
     * Useful when rendering on high resolution displays with low performance GPUs that may be
     * fill-rate limited.
     *
     * If a value is specified, a low resolution render pass is used to render the scene into a
     * low resolution render target, before it is copied to the screen.
     *
     * A value of `undefined` disables the low res render pass. Values between 0.5 and
     * `window.devicePixelRatio` can be tried to give  good results. The value should not be larger
     * than `window.devicePixelRatio`.
     *
     * @note Since no anti-aliasing is applied during dynamic rendering with `dynamicPixelRatio`
     * defined, visual artifacts may occur, especially with thin lines..
     *
     * @note The resolution of icons and text labels is not affected.
     *
     * @default `undefined`
     */
    dynamicPixelRatio?: number;
    /**
     * Set true to enable rendering mixed levels of detail (increases rendering performance).
     * If not set will enable mixed levels of detail for spherical projection
     * and disable for other projections.
     *
     * @default undefined
     */
    enableMixedLod?: boolean;
    /**
     * Set to `true` to allow picking of technique information associated with objects.
     */
    enablePickTechnique?: boolean;
    /**
     * Should be the {@link PolarTileDataSource} used on spherical projection.
     * Default is `true`.
     */
    enablePolarDataSource?: boolean;
    /**
     * Enable shadows in the map. Shadows will only be casted on features that use the "standard"
     * or "extruded-polygon" technique in the map theme.
     * @default false
     */
    enableShadows?: boolean;
    /**
     * Set to `true` to measure performance statistics.
     */
    enableStatistics?: boolean;
    /**
     * Set to true to extend the frustum culling. This improves the rejection of some tiles, which
     * normal frustum culling cannot detect. You can disable this property to measure performance.
     *
     * @default true
     */
    extendedFrustumCulling?: boolean;
    /**
     * How to calculate the Field of View, if not specified, then
     * [[DEFAULT_FOV_CALCULATION]] is used.
     */
    fovCalculation?: FovCalculation;
    heading?: number;
    languages?: string[];
    /**
     * If enableMixedLod is `true`, this value will be used to calculate the minimum Pixel Size of a
     * tile regarding to the screen size. When the area of a tile is smaller then this calculated
     * area on the screen, the subdivision of tiles is stopped and therefore higher level tiles will
     * be rendered instead.
     * @beta
     *
     * @default 256
     */
    lodMinTilePixelSize?: number;
    /**
     * If set, the view will constrained within the given bounds in geo coordinates.
     */
    maxBounds?: GeoBox;
    /**
     * Set maximum FPS (Frames Per Second). If VSync in enabled, the specified number may not be
     * reached, but instead the next smaller number than `maxFps` that is equal to the refresh rate
     * divided by an integer number.
     *
     * E.g.: If the monitors refresh rate is set to 60hz, and if `maxFps` is set to a value of `40`
     * (60hz/1.5), the actual used FPS may be 30 (60hz/2). For displays that have a refresh rate of
     * 60hz, good values for `maxFps` are 30, 20, 15, 12, 10, 6, 3 and 1. A value of `0` is ignored.
     */
    maxFps?: number;
    /**
     * The maximum number of tiles rendered from one data source at a time.
     *
     * @default See [[MapViewDefaults.maxVisibleDataSourceTiles]].
     */
    maxVisibleDataSourceTiles?: number;
    /**
     * The maximum zoom level. The default is `14`.
     */
    maxZoomLevel?: number;
    /**
     * Determines the minimum camera height, in meters.
     */
    minCameraHeight?: number;
    /**
     * The minimum zoom level; default is `1`.
     */
    minZoomLevel?: number;
    /**
     * Maximum timeout, in milliseconds, before a [[MOVEMENT_FINISHED_EVENT]] is sent after the
     * latest frame with a camera movement. The default is 300ms.
     */
    movementThrottleTimeout?: number;
    /**
     * Set fixed pixel ratio for rendering. Useful when rendering on high resolution displays with
     * low performance GPUs that may be fill-rate limited.
     * @default `window.devicePixelRatio`
     */
    pixelRatio?: number;
    /**
     * Storage level offset of regular tiles from reference datasource to align
     * {@link PolarTileDataSource} tiles to.
     * Default is `-1`.
     */
    polarGeometryLevelOffset?: number;
    /**
     * The name of the [[StyleSet]] used by {@link PolarTileDataSource}
     * to evaluate for the decoding.
     * Default is `"polar"`.
     */
    polarStyleSetName?: string;
    /**
     * Sets the data sources to use specific country point of view (political view).
     *
     * This option may result in rendering different country borders then commonly accepted for
     * some regions and it mainly regards to so called __disputed borders__. Although not all
     * data sources or themes may support it.
     *
     * @note Country code should be coded in lower-case ISO 3166-1 alpha-2 standard, if this option
     * is `undefined` the majority point of view will be used.
     */
    politicalView?: string;
    /**
     * `Projection` used by the `MapView`.
     *
     * The default value is [[mercatorProjection]].
     */
    projection?: Projection;
    /**
     * Limits the number of higher zoom levels (more detailed)
     * to be searched for fallback tiles.
     *
     * When zooming out, newly elected tiles may have not
     * yet loaded. {@link MapView} searches through
     * the tile cache for tiles ready to be displayed in
     * higher zoom levels. These tiles may be
     * located deeper in the quadtree.
     *
     * To disable a cache search, set the value to `0`.
     *
     * @default [[MapViewDefaults.quadTreeSearchDistanceDown]]
     */
    quadTreeSearchDistanceDown?: number;
    /**
     * Limits the number of reduced zoom levels (lower detail)
     * to be searched for fallback tiles.
     *
     * When zooming in, newly elected tiles may have not
     * yet loaded. {@link MapView} searches through
     * the tile cache for tiles ready to be displayed in
     * lower zoom levels. The tiles may be
     * located shallower in the quadtree.
     *
     * To disable a cache search, set the value to `0`.
     *
     * @default [[MapViewDefaults.quadTreeSearchDistanceUp]]
     */
    quadTreeSearchDistanceUp?: number;
    /**
     * We optionally pass in a renderer, from which we grab canvas and context.
     */
    renderer?: THREE$1.WebGLRenderer;
    /**
     * Specify if the cache should be counted in tiles or in megabytes.
     *
     * @see [[MapViewDefaults.resourceComputationType]].
     */
    resourceComputationType?: ResourceComputationType;
    /**
     * Set to `true` to allow rendering scene synchronously.
     *
     * By calling `renderSync()` scene draws immediately, opposite to default case when
     * `update` method requests redraw and waits for the next animation frame.
     *
     * You need to set up your own render loop controller.
     * Event `MapViewEventNames.Update` fired when {@link MapView} requests for an redraw.
     * E.g.: When tiles loaded asynchronously and ready for rendering.
     *
     * @note Internal `maxFps` will be overridden and may not work properly as `renderSync`
     * intended to be called from external render loop.
     *
     * @default false.
     */
    synchronousRendering?: boolean;
    target?: any;
    /**
     * Relative URIs are resolved to full URL using the document's base URL
     * (see: https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2).
     */
    theme?: string;
    /**
     * Enable throttling for the TaskScheduler
     * @default false
     * @beta
     */
    throttlingEnabled?: boolean;
    /**
     * Size of a tile cache for one data source.
     *
     * @default See [[MapViewDefaults.tileCacheSize]].
     */
    tileCacheSize?: number;
    /**
     * Enable map repeat for planar projections.
     * If `true`, map will be repeated in longitudinal direction continuously.
     * If `false`, map will end on lon -180 & 180 deg.
     *
     * @default `true`
     */
    tileWrappingEnabled?: boolean;
    tilt?: number;
    /**
     * Resolve `URI` referenced in `MapView` assets using this resolver.
     *
     * Use, to support application/deployment specific `URI`s into actual `URLs` that can be loaded
     * with `fetch`.
     *
     * Example:
     * ```
     * uriResolver: new PrefixMapUriResolver({
     *     "local://poiMasterList": "/assets/poiMasterList.json",
     *        // will match only 'local//:poiMasterList' and
     *        // resolve to `/assets/poiMasterList.json`
     *     "local://icons/": "/assets/icons/"
     *        // will match only 'local//:icons/ANYPATH' (and similar) and
     *        // resolve to `/assets/icons/ANYPATH`
     * })
     * ```
     *
     * @see {@link @arcadecity/arcade-map/utils#UriResolver}
     * @See {@link @arcadecity/arcade-map/utils#PrefixMapUriResolver}
     */
    uriResolver?: UriResolver;
    zoomLevel?: number;
}
/**
 * The core class of the library to call in order to create a map visualization. It needs to be
 * linked to datasources.
 */
declare class MapView extends EventDispatcher {
    private readonly handleRequestAnimationFrame;
    private readonly m_animatedExtrusionHandler;
    private m_animationCount;
    private m_animationFrameHandle;
    private readonly m_camera;
    private readonly m_canvas;
    private readonly m_collisionDebugCanvas;
    private readonly m_connectedDataSources;
    private readonly m_context;
    private m_copyrightInfo;
    private m_disposed;
    private m_drawing;
    private m_elevationProvider?;
    private m_elevationRangeSource?;
    private m_elevationSource?;
    private m_enableMixedLod;
    private readonly m_enablePolarDataSource;
    private readonly m_env;
    private readonly m_failedDataSources;
    private m_firstFrameComplete;
    private m_firstFrameRendered;
    private m_forceCameraAspect;
    private m_frameNumber;
    private m_geoMaxBounds?;
    private m_languages;
    private m_lastTileIds;
    private readonly m_lodMinTilePixelSize;
    private readonly m_mapAnchors;
    /**
     * The instance of {@link MapRenderingManager} managing the rendering of the map. It is a public
     * property to allow access and modification of some parameters of the rendering process at
     * runtime.
     */
    readonly mapRenderingManager: IMapRenderingManager;
    private m_maxZoomLevel;
    private readonly m_minCameraHeight;
    private m_minZoomLevel;
    private readonly m_movementDetector;
    private m_movementFinishedUpdateTimerId?;
    private readonly m_options;
    /** Separate scene for overlay map anchors */
    private readonly m_overlayScene;
    /** Root node of [[m_overlayScene]] that gets cleared every frame. */
    private readonly m_overlaySceneRoot;
    private readonly m_pickHandler;
    private m_pitch;
    private m_pixelRatio?;
    private m_pixelToWorld?;
    private readonly m_plane;
    private readonly m_poiManager;
    private m_pointOfView?;
    private readonly m_poiTableManager;
    private readonly m_polarDataSource?;
    private m_politicalView;
    private m_postEffects?;
    private m_previousFrameTimeStamp?;
    private readonly m_raycaster;
    private readonly m_renderer;
    private m_renderLabels;
    private m_roll;
    /**
     * Relative to eye camera. This camera is internal camera used to
     * improve precision when rendering geometries.
     */
    private readonly m_rteCamera;
    /** Default scene for map objects and map anchors */
    private readonly m_scene;
    private m_sceneEntity;
    private readonly m_sceneEnvironment;
    /** Root node of [[m_scene]] that gets cleared every frame. */
    private readonly m_sceneRoot;
    private readonly m_screenProjector;
    private readonly m_sphere;
    private m_targetGeoPos;
    private m_targetDistance;
    private readonly m_targetWorldPos;
    private m_taskScheduler;
    private m_taskSchedulerTimeout;
    private m_textElementsRenderer;
    private readonly m_themeManager;
    private m_thisFrameTilesChanged;
    private readonly m_tileDataSources;
    private readonly m_tileGeometryManager;
    private readonly m_tileObjectRenderer;
    private m_tileWrappingEnabled;
    private m_updatePending;
    private readonly m_uriResolver?;
    private readonly m_userImageCache;
    private readonly m_viewRanges;
    private m_visibleTiles;
    private m_visibleTileSetLock;
    private readonly m_visibleTileSetOptions;
    private m_world;
    private m_worldMaxBounds?;
    private m_yaw;
    private m_zoomLevel;
    /**
     * Keep the events here to avoid a global reference to MapView (and thus prevent garbage collection).
     */
    private readonly UPDATE_EVENT;
    private readonly RENDER_EVENT;
    private readonly DID_RENDER_EVENT;
    private readonly FIRST_FRAME_EVENT;
    private readonly FRAME_COMPLETE_EVENT;
    private readonly THEME_LOADED_EVENT;
    private readonly ANIMATION_STARTED_EVENT;
    private readonly ANIMATION_FINISHED_EVENT;
    private readonly MOVEMENT_STARTED_EVENT;
    private readonly MOVEMENT_FINISHED_EVENT;
    private readonly CONTEXT_LOST_EVENT;
    private readonly CONTEXT_RESTORED_EVENT;
    private readonly COPYRIGHT_CHANGED_EVENT;
    private readonly DISPOSE_EVENT;
    /**
     * Constructs a new `MapView` with the given options or canvas element.
     *
     * @param options - The `MapView` options or the HTML canvas element used to display the map.
     */
    constructor(options: MapViewOptions);
    /**
     * Adds a new {@link DataSource} to this `MapView`.
     *
     * @remarks
     * `MapView` needs at least one {@link DataSource} to display something.
     * @param dataSource - The data source.
     */
    addDataSource(dataSource: DataSource): Promise<void>;
    /**
     * The {@link AnimatedExtrusionHandler} controls animated extrusion effect
     * of the extruded objects in the {@link Tile}
     */
    get animatedExtrusionHandler(): AnimatedExtrusionHandler;
    /**
     * Returns `true` if this `MapView` is constantly redrawing the scene.
     */
    get animating(): boolean;
    /**
     * Begin animating the scene.
     */
    beginAnimation(): void;
    /**
     * The THREE.js camera used by this `MapView` to render the main scene.
     *
     * @remarks
     * When modifying the camera all derived properties like:
     * - {@link MapView.target}
     * - {@link MapView.zoomLevel}
     * - {@link MapView.tilt}
     * - {@link MapView.heading}
     * could change.
     * These properties are cached internally and will only be updated in the next animation frame.
     * FIXME: Unfortunately THREE.js is not dispatching any events when camera properties change
     * so we should have an API for enforcing update of cached values.
     */
    get camera(): THREE$1.PerspectiveCamera;
    /**
     * Returns `true` if the camera moved in the last frame.
     */
    get cameraIsMoving(): boolean;
    /**
     * @hidden
     * The {@link CameraMovementDetector} detects camera movements. Made available for performance
     * measurements.
     */
    get cameraMovementDetector(): CameraMovementDetector;
    /**
     * The HTML canvas element used by this `MapView`.
     */
    get canvas(): HTMLCanvasElement;
    private checkCopyrightUpdates;
    /**
     * Check if the set of visible tiles changed since the last frame.
     *
     * May be called multiple times per frame.
     *
     * Equality is computed by creating a string containing the IDs of the tiles.
     */
    private checkIfTilesChanged;
    /**
     * The color used to clear the view.
     */
    get clearColor(): number;
    /**
     * Clear the tile cache.
     *
     * @remarks
     * Remove the {@link Tile} objects created by cacheable
     * {@link DataSource}s. If a {@link DataSource} name is
     * provided, this method restricts the eviction the {@link DataSource} with the given name.
     *
     * @param dataSourceName - The name of the {@link DataSource}.
     * @param filter Optional tile filter
     */
    clearTileCache(dataSourceName?: string, filter?: (tile: Tile) => boolean): void;
    /**
     * The HTML canvas element used by this `MapView`.
     */
    get collisionDebugCanvas(): HTMLCanvasElement | undefined;
    get copyrightInfo(): CopyrightInfo[];
    createBox(x: number, y: number): void;
    private createTextRenderer;
    private createVisibleTileSet;
    /**
     * Returns {@link DataSource}s displayed by this `MapView`.
     */
    get dataSources(): DataSource[];
    /**
     * Is `true` if dispose() as been called on `MapView`.
     */
    get disposed(): boolean;
    /**
     * Returns the elevation provider.
     */
    get elevationProvider(): ElevationProvider | undefined;
    get enableMixedLod(): boolean | undefined;
    /**
     * Stop animating the scene.
     */
    endAnimation(): void;
    /**
     * Environment used to evaluate dynamic scene expressions.
     */
    get env(): Env;
    private extractAttitude;
    flyTo(coords: GeoCoordinates, distance?: number, tilt?: number): void;
    /**
     * The distance (in pixels) between the screen and the camera.
     * @deprecated Use {@link CameraUtils.getFocalLength}
     */
    get focalLength(): number;
    /**
     * @hidden
     * Return current frame number.
     */
    get frameNumber(): number;
    /**
     * The position in geo coordinates of the center of the scene.
     * @internal
     */
    get geoCenter(): GeoCoordinates;
    /**
     * The position in geo coordinates of the center of the scene.
     *
     * @remarks
     * Longitude values outside of -180 and +180 are acceptable.
     */
    set geoCenter(geoCenter: GeoCoordinates);
    /**
     * The view's maximum bounds in geo coordinates if any.
     */
    get geoMaxBounds(): GeoBox | undefined;
    /**
     * Sets or clears the view's maximum bounds in geo coordinates.
     *
     * @remarks
     * If set, the view will be
     * constrained to the given geo bounds.
     */
    set geoMaxBounds(bounds: GeoBox | undefined);
    /**
     * Get canvas client size in css/client pixels.
     *
     * Supports canvases not attached to DOM, which have 0 as `clientWidth` and `clientHeight` by
     * calculating it from actual canvas size and current pixel ratio.
     */
    private getCanvasClientSize;
    /**
     * Returns the unique {@link DataSource} matching the given name.
     */
    getDataSourceByName(dataSourceName: string): DataSource | undefined;
    /**
     * Returns the list of the enabled data sources.
     */
    private getEnabledTileDataSources;
    /**
     * Same as {@link MapView.getGeoCoordinatesAt} but always returning a geo coordinate.
     */
    getGeoCoordinatesAt(x: number, y: number, fallback: true): GeoCoordinates;
    /**
     * Returns the {@link @here/harp-geoutils#GeoCoordinates} from the
     * given screen position.
     *
     * @remarks
     * If `fallback !== true` the return value can be `null`, in case the camera has a high tilt
     * and the given `(x, y)` value is not intersecting the ground plane.
     * If `fallback === true` the return value will always exist but it might not be on the earth
     * surface.
     * If {@link MapView.tileWrappingEnabled} is `true` the returned geo coordinates will have a
     * longitude clamped to [-180,180] degrees.
     * The returned geo coordinates are not normalized so that a map object placed at that position
     * will be below the (x,y) screen coordinates, regardless which world repetition was on screen.
     *
     * @param x - The X position in css/client coordinates (without applied display ratio).
     * @param y - The Y position in css/client coordinates (without applied display ratio).
     * @param fallback - Whether to compute a fallback position if the earth surface is not hit.
     * @returns Un-normalized geo coordinates
     */
    getGeoCoordinatesAt(x: number, y: number, fallback?: boolean): GeoCoordinates | null;
    /**
     * Returns the normalized screen coordinates from the given pixel position.
     *
     * @param x - The X position in css/client coordinates (without applied display ratio).
     * @param y - The Y position in css/client coordinates (without applied display ratio).
     */
    getNormalizedScreenCoordinates(x: number, y: number): THREE$1.Vector3;
    private getRenderedTilesCopyrightInfo;
    /**
     * Returns the currently set `Theme` as a `Promise` as it might be still loading/updating.
     */
    getTheme(): Promise<Theme>;
    getWorldPositionAt(x: number, y: number, fallback: true): THREE$1.Vector3;
    getWorldPositionAt(x: number, y: number, fallback?: boolean): THREE$1.Vector3 | null;
    /**
     * Returns heading angle in degrees.
     */
    get heading(): number;
    /**
     * Set the heading angle of the map.
     * @param heading -: New heading angle in degrees.
     */
    set heading(heading: number);
    /**
     * Returns `true` if the current frame will immediately be followed by another frame.
     * @deprecated This should only be used for the internal handling of the render loop,
     * if you use your own RenderLoop use {@link MapView::renderSync} in combination with
     * {@link MapViewEventNames.FrameComplete}
     **/
    get isDynamicFrame(): boolean;
    /**
     * @internal
     * Get the {@link ImageCache} that belongs to this `MapView`.
     *
     * Images stored in this cache are primarily used for POIs (icons) and they are used with the
     * current theme. Although images can be explicitly added and removed from the cache, it is
     * advised not to remove images from this cache. If an image that is part of client code
     * should be removed at any point other than changing the theme, the {@link useImageCache}
     * should be used instead.
     */
    get imageCache(): MapViewImageCache;
    /**
     * Returns true if the specified {@link DataSource} is enabled.
     */
    isDataSourceEnabled(dataSource: DataSource): boolean;
    /**
     * Returns the status of frustum culling after each update.
     */
    get lockVisibleTileSet(): boolean;
    /**
     * Enable of disable frustum culling after each update.
     */
    set lockVisibleTileSet(value: boolean);
    /**
     * Adjusts the camera to look at a given geo coordinate with tilt and heading angles.
     *
     * @remarks
     * #### Note on `target` and `bounds`
     *
     * If `bounds` are specified, `zoomLevel` and `distance` parameters are ignored and `lookAt`
     * calculates best zoomLevel (and possibly target) to fit given bounds.
     *
     * Following table shows how relation between `bounds` and target.
     *
     * | `bounds`             | `target`    | actual `target`
     * | ------               | ------      | --------
     * | {@link @arcadecity/arcade-map/geoutils#GeoBox}           | _defined_   | `params.target` is used
     * | {@link @arcadecity/arcade-map/geoutils#GeoBox}           | `undefined` | `bounds.center` is used as new `target`
     * | {@link @arcadecity/arcade-map/geoutils#GeoBoxExtentLike} | `undefined` | current `MapView.target` is used
     * | {@link @arcadecity/arcade-map/geoutils#GeoBoxExtentLike} | _defined_   | `params.target` is used
     * | [[GeoCoordLike]][]   | `undefined` | new `target` is calculated as center of world box covering given points
     * | [[GeoCoordLike]][]   | _defined_   | `params.target` is used and zoomLevel is adjusted to view all given geo points
     *
     * In each case, `lookAt` finds minimum `zoomLevel` that covers given extents or geo points.
     *
     * With flat projection, if `bounds` represents points on both sides of anti-meridian, and
     * {@link MapViewOptions.tileWrappingEnabled} is used, `lookAt` will use this knowledge and find
     * minimal view that may cover "next" or "previous" world.
     *
     * With sphere projection if `bounds` represents points on both sides of globe, best effort
     * method is used to find best `target``.
     *
     * #### Examples
     *
     * ```typescript
     * mapView.lookAt({heading: 90})
     *     // look east retaining current `target`, `zoomLevel` and `tilt`
     *
     * mapView.lookAt({lat: 40.707, lng: -74.01})
     *    // look at Manhattan, New York retaining other view params
     *
     * mapView.lookAt(bounds: { latitudeSpan: 10, longitudeSpan: 10})
     *    // look at current `target`, but extending zoomLevel so we see 10 degrees of lat/long span
     * ```
     *
     * @see More examples in [[LookAtExample]].
     *
     * @param params - {@link LookAtParams}
     *
     * {@labels WITH_PARAMS}
     */
    lookAt(params: Partial<LookAtParams>): void;
    /**
     * The method that sets the camera to the desired angle (`tiltDeg`) and `distance` (in meters)
     * to the `target` location, from a certain heading (`headingAngle`).
     *
     * @remarks
     * @param target - The location to look at.
     * @param distance - The distance of the camera to the target in meters.
     * @param tiltDeg - The camera tilt angle in degrees (0 is vertical), curbed below 89deg
     *                @default 0
     * @param headingDeg - The camera heading angle in degrees and clockwise (as opposed to yaw)
     *                   @default 0
     * starting north.
     * @deprecated Use lookAt version with {@link LookAtParams} object parameter.
     */
    lookAt(target: GeoCoordLike, distance: number, tiltDeg?: number, headingDeg?: number): void;
    private lookAtImpl;
    /**
     * The node in this MapView's scene containing the user {@link MapAnchor}s.
     *
     * @remarks
     * All (first level) children of this node will be positioned in world space according to the
     * [[MapAnchor.geoPosition]].
     * Deeper level children can be used to position custom objects relative to the anchor node.
     */
    get mapAnchors(): MapAnchors;
    /**
     * Visit each tile in visible, rendered, and cached sets.
     *
     * @remarks
     *  * Visible and temporarily rendered tiles will be marked for update and retained.
     *  * Cached but not rendered/visible will be evicted.
     *
     * @param dataSource - If passed, only the tiles from this {@link DataSource} instance
     * are processed. If `undefined`, tiles from all {@link DataSource}s are processed.
     * @param filter Optional tile filter
     */
    markTilesDirty(dataSource?: DataSource, filter?: (tile: Tile) => boolean): void;
    get maxFps(): number;
    /**
     * The maximum zoom level. Default is 14.
     */
    get maxZoomLevel(): number;
    /**
     * The minimum camera height in meters.
     */
    get minCameraHeight(): number;
    /**
     * The minimum zoom level.
     */
    get minZoomLevel(): number;
    private movementStarted;
    private movementFinished;
    /**
     * Transfer the NDC point to view space.
     * @param vector - Vector to transform.
     * @param result - Result to place calculation.
     */
    ndcToView(vector: Vector3Like, result: THREE$1.Vector3): THREE$1.Vector3;
    /**
     * Default handler for webglcontextlost event.
     *
     * Note: The renderer `this.m_renderer` may not be initialized when this function is called.
     */
    private readonly onWebGLContextLost;
    /**
     * Default handler for webglcontextrestored event.
     *
     * Note: The renderer `this.m_renderer` may not be initialized when this function is called.
     */
    private readonly onWebGLContextRestored;
    /**
     * The THREE.js overlay scene
     */
    get overlayScene(): THREE$1.Scene;
    get pixelRatio(): number;
    /**
     * Returns the ratio between a pixel and a world unit for the current camera (in the center of
     * the camera projection).
     */
    get pixelToWorld(): number;
    /**
     * @hidden
     * @internal
     * Get the {@link PoiManager} that belongs to this `MapView`.
     */
    get poiManager(): PoiManager;
    /**
     * @hidden
     * Get the array of {@link PoiTableManager} that belongs to this `MapView`.
     */
    get poiTableManager(): PoiTableManager;
    /**
     * Loads a post effects definition file.
     *
     * @param postEffectsFile - File URL describing the post effects.
     */
    loadPostEffects(postEffectsFile: string): void;
    /**
     * The abstraction of the {@link MapRenderingManager} API for post effects.
     */
    get postEffects(): PostEffects | undefined;
    set postEffects(postEffects: PostEffects | undefined);
    /**
     * The projection used to project geo coordinates to world coordinates.
     */
    get projection(): Projection;
    /**
     * Changes the projection at run time.
     *
     * @param projection - The {@link @here/harp-geoutils#Projection} instance to use.
     */
    set projection(projection: Projection);
    /**
     * Removes {@link DataSource} from this `MapView`.
     *
     * @param dataSource - The data source to be removed
     */
    removeDataSource(dataSource: DataSource): void;
    /**
     * Renders the current frame.
     */
    private render;
    /**
     * The THREE.js `WebGLRenderer` used by this scene.
     */
    get renderer(): THREE$1.WebGLRenderer;
    /**
     * @returns Whether label rendering is enabled.
     */
    get renderLabels(): boolean;
    /**
     * Enables or disables rendering of labels.
     * @param value - `true` to enable labels `false` to disable them.
     */
    set renderLabels(value: boolean);
    /**
     * Render loop callback that should only be called by [[requestAnimationFrame]].
     * Will trigger [[requestAnimationFrame]] again if updates are pending or  animation is running.
     * @param frameStartTime - The start time of the current frame
     */
    private renderLoop;
    /**
     * Redraws scene immediately
     *
     * @remarks
     * @note Before using this method, set `synchronousRendering` to `true`
     * in the {@link MapViewOptions}
     *
     * @param frameStartTime - Optional timestamp for start of frame.
     * Default: [[PerformanceTimer.now()]]
     */
    renderSync(frameStartTime?: number): void;
    /**
     * @internal
     * @param fontCatalogs
     * @param textStyles
     * @param defaultTextStyle
     */
    resetTextRenderer(fontCatalogs?: FontCatalogConfig[], textStyles?: TextStyleDefinition[], defaultTextStyle?: TextStyleDefinition): Promise<void>;
    /**
     * Resize the HTML canvas element and the THREE.js `WebGLRenderer`.
     *
     * @param width - The new width.
     * @param height - The new height.
     */
    resize(width: number, height: number): void;
    /**
     * The THREE.js scene used by this `MapView`.
     */
    get scene(): THREE$1.Scene;
    get sceneEntity(): ECSYThreeEntity;
    set sceneEntity(sceneEntity: ECSYThreeEntity);
    /**
     * The MapViewEnvironment used by this `MapView`.
     * @internal
     */
    get sceneEnvironment(): MapViewEnvironment;
    /**
     * Sets the field of view calculation, and applies it immediately to the camera.
     *
     * @param fovCalculation - How to calculate the FOV
     * @param height - Viewport height.
     */
    private setFovOnCamera;
    private setPostEffects;
    /**
     * Changes the `Theme`used by this `MapView`to style map elements.
     */
    setTheme(theme: Theme | string): Promise<Theme>;
    private setupCamera;
    private setupStats;
    private setupRenderer;
    get shadowsEnabled(): boolean;
    set shadowsEnabled(enabled: boolean);
    /**
     * Start render loop if not already running.
     */
    private startRenderLoop;
    /**
     * Returns the storage level for the given camera setup.
     * @remarks
     * Actual storage level of the rendered data also depends
     * on {@link DataSource.storageLevelOffset}.
     */
    get storageLevel(): number;
    /**
     * Get geo coordinates of camera focus (target) point.
     *
     * @remarks
     * This point is not necessarily on the ground, i.e.:
     *  - if the tilt is high and projection is {@link @arcadecity/arcade-map/geoutils#sphereProjection}`
     *  - if the camera was modified directly and is not pointing to the ground.
     * In any case the projection of the target point will be in the center of the screen.
     *
     * @returns geo coordinates of the camera focus point.
     */
    get target(): GeoCoordinates;
    /** @internal
     * Get distance from camera to the point of focus in world units.
     *
     * @note If camera does not point to any ground anymore the last focus point distance is
     * then returned.
     *
     * @returns Last known focus point distance.
     */
    get targetDistance(): number;
    get taskQueue(): TaskQueue;
    /**
     * @hidden
     * The {@link TextElementsRenderer} select the visible {@link TextElement}s and renders them.
     */
    get textElementsRenderer(): TextElementsRenderer;
    /**
     * Returns tilt angle in degrees.
     */
    get tilt(): number;
    /**
     * The [[TileGeometryManager]] manages geometry during loading and handles hiding geometry of
     * specified [[GeometryKind]]s.
     * @deprecated
     */
    get tileGeometryManager(): TileGeometryManager | undefined;
    get tileWrappingEnabled(): boolean;
    /**
     * Requests a redraw of the scene.
     */
    update(): void;
    /**
     * Updates the camera and the projections and resets the screen collisions,
     * note, setupCamera must be called before this is called.
     *
     * @remarks
     * @param viewRanges - optional parameter that supplies new view ranges, most importantly
     * near/far clipping planes distance. If parameter is not provided view ranges will be
     * calculated from [[ClipPlaneEvaluator]] used in {@link VisibleTileSet}.
     */
    private updateCameras;
    /**
     * Update `Env` instance used for style `Expr` evaluations.
     */
    private updateEnv;
    /**
     * Derive the look at settings (i.e. target, zoom, ...) from the current camera.
     */
    private updateLookAtSettings;
    /**
     * Plug-in PolarTileDataSource for spherical projection and plug-out otherwise
     */
    private updatePolarDataSource;
    /**
     * Get the {@link ImageCache} for user images that belongs to this `MapView`.
     *
     * Images added to this cache can be removed if no longer required.
     */
    get userImageCache(): MapViewImageCache;
    /**
     * Returns height of the viewport in pixels.
     */
    get viewportHeight(): number;
    /**
     * Get object describing frustum planes distances and min/max visibility range for actual
     * camera setup.
     *
     * @remarks
     * Near and far plane distance are self explanatory while minimum and maximum visibility range
     * describes the extreme near/far planes distances that may be achieved with current camera
     * settings, meaning at current zoom level (ground distance) and any possible orientation.
     * @note Visibility is directly related to camera [[ClipPlaneEvaluator]] used and determines
     * the maximum possible distance of camera far clipping plane regardless of tilt, but may change
     * whenever zoom level changes. Distance is measured in world units which may be approximately
     * equal to meters, but this depends on the distortion related to projection type used.
     * @internal
     */
    get viewRanges(): ViewRanges;
    /**
     * Access the `VisibleTileSet` to get access to all current datasources and their visible tiles.
     */
    get visibleTileSet(): VisibleTileSet;
    get world(): ECSYThreeWorld;
    set world(world: ECSYThreeWorld);
    /**
     * The position in world coordinates of the center of the scene.
     */
    get worldCenter(): THREE$1.Vector3;
    /**
     * @hidden
     * @internal
     * The view's maximum bounds in world coordinates if any.
     */
    get worldMaxBounds(): THREE$1.Box3 | OrientedBox3 | undefined;
    /** @internal
     * Get world coordinates of camera focus point.
     *
     * @remarks
     * @note The focus point coordinates are updated with each camera update so you don't need
     * to re-calculate it, although if the camera started looking to the void, the last focus
     * point is stored.
     *
     * @returns world coordinates of the camera focus point.
     */
    get worldTarget(): THREE$1.Vector3;
    /**
     * Returns the zoom level for the given camera setup.
     */
    get zoomLevel(): number;
}
/**
 * Parameters for {@link (MapView.lookAt:WITH_PARAMS)}.
 */
interface LookAtParams {
    /**
     * Fit MapView to these boundaries.
     *
     * If specified, `zoomLevel` and `distance` parameters are ignored and `lookAt` calculates best
     * `zoomLevel` to fit given bounds.
     *
     * * if `bounds` is {@link @arcadecity/arcade-map/geoutils#GeoBox}, then `lookAt`
     *   use {@link LookAtParams.target} or `bounds.target` and
     *   ensure whole box is visible
     *
     * * if `bounds` is {@link @arcadecity/arcade-map/geoutils#GeoPolygon}, then `lookAt`
     *   use `bounds.getCentroid()` and ensure whole polygon is visible
     *
     * * if `bounds` is {@link @arcadecity/arcade-map/geoutils#GeoBoxExtentLike},
     *   then `lookAt` will use {@link LookAtParams.target} or
     *   current {@link MapView.target} and ensure whole extents are visible
     *
     * * if `bounds` is [[GeoCoordLike]][], then `lookAt` will use {@link LookAtParams.target} or
     *   calculated `target` as center of world box covering given points and ensure all points are
     *   visible
     *
     * Note in sphere projection some points are not visible if you specify bounds that span more
     * than 180 degrees in any direction.
     *
     * @see {@link (MapView.lookAt:WITH_PARAMS)} for details on how `bounds`
     *      interact with `target` parameter
     */
    bounds: GeoBox | GeoBoxExtentLike | GeoCoordLike[] | GeoPolygon;
    /**
     * Camera distance to the target point in world units.
     * @default zoomLevel defaults will be used if not set.
     */
    distance: number;
    /**
     * Heading angle in degrees and clockwise. 0 is north-up.
     * @default 0 in {@link MapView.constructor} context.
     * @default {@link MapView.heading} in {@link (MapView.lookAt:WITH_PARAMS)} context.
     */
    heading: number;
    /**
     * Target/look at point of the MapView.
     *
     * @note If the given point is not on the ground (altitude != 0) {@link MapView} will do a
     * raycasting internally to find a target on the ground.
     *
     * As a consequence {@link MapView.target} and {@link MapView.zoomLevel}
     * will not match the values
     * that were passed into the {@link (MapView.lookAt:WITH_PARAMS)} method.
     * @default `new GeoCoordinates(25, 0)` in {@link MapView.constructor} context.
     * @default {@link MapView.target} in {@link (MapView.lookAt:WITH_PARAMS)} context.
     */
    target: GeoCoordLike;
    /**
     * Tilt angle in degrees. 0 is top down view.
     * @default 0 in {@link MapView.constructor} context.
     * @default {@link MapView.tilt} in {@link (MapView.lookAt:WITH_PARAMS)} context.
     * @note Maximum supported tilt is 89°
     */
    tilt: number;
    /**
     * Zoomlevel of the MapView.
     * @note Takes precedence over distance.
     * @default 5 in {@link MapView.constructor} context.
     * @default {@link MapView.zoomLevel} in {@link (MapView.lookAt:WITH_PARAMS)} context.
     */
    zoomLevel: number;
}
declare enum MapViewEventNames {
    /** Called before this `MapView` starts to render a new frame. */
    Update = "update",
    /** Called when the WebGL canvas is resized. */
    Resize = "resize",
    /** Called when the frame is about to be rendered. */
    Render = "render",
    /** Called after a frame has been rendered. */
    AfterRender = "didrender",
    /** Called after the first frame has been rendered. */
    FirstFrame = "first-render",
    /**
     * Called when the rendered frame was complete, i.e. all the necessary tiles and resources
     * are loaded and rendered.
     */
    FrameComplete = "frame-complete",
    /** Called when the theme has been loaded with the internal {@link ThemeLoader}. */
    ThemeLoaded = "theme-loaded",
    /** Called when the animation mode has started. */
    AnimationStarted = "animation-started",
    /** Called when the animation mode has stopped. */
    AnimationFinished = "animation-finished",
    /** Called when a camera interaction has been detected. */
    MovementStarted = "movement-started",
    /** Called when a camera interaction has been stopped. */
    MovementFinished = "movement-finished",
    /** Called when a data source has been connected or failed to connect. */
    DataSourceConnect = "datasource-connect",
    /** Emitted when copyright info of rendered map has been changed. */
    CopyrightChanged = "copyright-changed",
    /** Called when the WebGL context is lost. */
    ContextLost = "webglcontext-lost",
    /** Called when the WebGL context is restored. */
    ContextRestored = "webglcontext-restored",
    /** Called when camera position has been changed. */
    CameraPositionChanged = "camera-changed",
    /** Called when dispose has been called, before any cleanup is done. */
    Dispose = "dispose"
}
/**
 * The type of `RenderEvent`.
 */
interface RenderEvent extends THREE$1.Event {
    type: MapViewEventNames;
    time?: number;
}

/**
 * Animation states for extrusion effect
 */
declare enum AnimatedExtrusionState {
    None = 0,
    Started = 1,
    Finished = 2
}
/**
 * Handles animated extrusion effect of the buildings in {@link MapView}.
 */
declare class AnimatedExtrusionHandler {
    private readonly m_mapView;
    /**
     * Animate the extrusion of the buildings if set to `true`.
     */
    enabled: boolean;
    /**
     * Duration of the building's extrusion in milliseconds
     */
    duration: number;
    private m_minZoomLevel;
    private m_forceEnabled;
    private readonly m_dataSourceMap;
    private m_state;
    private m_startTime;
    /**
     * Creates an {@link AnimatedExtrusionHandler} in {@link MapView}.
     *
     * @param m_mapView - Instance of {@link MapView} on which the animation will run.
     */
    constructor(m_mapView: MapView);
    /**
     * Returns whether the extrusion animation is force enabled or not.
     */
    get forceEnabled(): boolean;
    /**
     * If `forceEnabled` is set to `true` then `animateExtrusion` and `animateExtrusionDuration`
     * values from [[extrudedPolygonTechnique]] will be ignored and
     * `AnimatedExtrusionHandler.enabled` with `AnimatedExtrusionHandler.duration` will be used
     */
    set forceEnabled(force: boolean);
    /**
     * Gets min zoom level at which extruded animation is enabled.
     */
    get minZoomLevel(): number;
    /**
     * Sets the extrusion animation properties obtained from a given technique.
     * @internal
     * @param technique - The technique where the extrusion animation properties are defined.
     * @param env - The environment used to evaluate technique properties.
     * @returns True if the technique has animation enabled (or animation is forced), false
     * otherwise.
     */
    setAnimationProperties(technique: Technique, env: MapEnv): boolean;
    /**
     * Updates the extrusion animation for every frame.
     * @internal
     */
    update(zoomLevel: number): void;
    /**
     * Adds a tile to be animated.
     * @internal
     * @param tile - The tile to be animated.
     * @param materials - Extruded materials belonging to the tile.
     */
    add(tile: Tile, materials: ExtrusionFeature[]): void;
    /**
     * Is `true` if there's any extrusion animation ongoing.
     */
    get isAnimating(): boolean;
    private getTileMap;
    private getOrCreateTileMap;
    private skipAnimation;
    private wasAnyAncestorAnimated;
    private wasAnyDescendantAnimated;
    private removeTile;
    private animateExtrusion;
    private resetAnimation;
    private setExtrusionRatio;
    private setTileExtrusionRatio;
}

/**
 * @internal
 * Base class for tile loaders that provides state handling, request abortion and a load promise.
 */
declare abstract class BaseTileLoader implements ITileLoader {
    protected dataSource: DataSource;
    protected tileKey: TileKey;
    state: TileLoaderState;
    /**
     * Error object if loading or decoding failed.
     */
    error?: Error;
    protected m_priority: number;
    /**
     * The abort controller notifying the [[DataProvider]] to cancel loading.
     */
    private loadAbortController;
    /**
     * The promise which is resolved when loading and decoding have finished.
     */
    private donePromise?;
    /**
     * The internal function that is called when loading and decoding have finished successfully.
     */
    private resolveDonePromise?;
    /**
     * The internal function that is called when loading and decoding failed.
     */
    private rejectedDonePromise?;
    /**
     * Set up loading of a single [[Tile]].
     *
     * @param dataSource - The [[DataSource]] the tile belongs to.
     * @param tileKey - The quadtree address of a [[Tile]].
     */
    constructor(dataSource: DataSource, tileKey: TileKey);
    /**
     * @override
     */
    get priority(): number;
    /**
     * @override
     */
    set priority(value: number);
    /**
     * @override
     */
    loadAndDecode(): Promise<TileLoaderState>;
    /**
     * @override
     */
    waitSettled(): Promise<TileLoaderState>;
    /**
     * @override
     */
    cancel(): void;
    /**
     * @override
     */
    get isFinished(): boolean;
    /**
     * Called on load cancelation, may be overriden to extend behaviour.
     */
    protected cancelImpl(): void;
    /**
     * Called on tile load.
     *
     * @param abortSignal - Signal emitted to abort loading.
     * @param onDone - Callback that must be called once the loading is done.
     * @param onError - Callback that must be called on loading error.
     */
    protected abstract loadImpl(abortSignal: AbortSignal, onDone: (doneState: TileLoaderState) => void, onError: (error: Error) => void): void;
    /**
     * Start loading. Only call if loading did not start yet.
     */
    private load;
    /**
     * Called when loading and decoding has finished successfully. Resolves loading promise if the
     * state is Ready, otherwise it rejects the promise with the supplied state.
     *
     * @param doneState - The latest state of loading.
     */
    private onDone;
    /**
     * Called when loading or decoding has finished with an error.
     *
     * @param error - Error object describing the failing.
     */
    private onError;
}

/**
 * Generates Bounds for a camera view and a projection
 *
 * @internal
 */
declare class BoundsGenerator {
    private readonly m_view;
    private m_viewBounds;
    constructor(m_view: {
        camera: PerspectiveCamera;
        projection: Projection;
        tileWrappingEnabled: boolean;
    });
    /**
     * Generates a {@link @arcadecity/arcade-map/geoutils#GeoPolygon} covering the visible map.
     * The coordinates are sorted to ccw winding, so a polygon could be drawn with them.
     * @returns The GeoPolygon with the view bounds or undefined if world is not in view.
     */
    generate(): GeoPolygon | undefined;
    private createViewBounds;
}

/**
 * Use `ColorCache` to reuse a color specified by name and save allocation as well as
 * setup time.
 *
 * Implemented as a singleton. Do not modify colors after getting them from the `ColorCache`.
 */
declare class ColorCache {
    /**
     * Return instance of `ColorCache`.
     */
    static get instance(): ColorCache;
    private static readonly m_instance;
    private readonly m_map;
    /**
     * Returns the color for the given `colorCode`. This function may reuse a previously generated
     * color, so you cannot modify the contents of the color.
     *
     * @param colorCode - ThreeJS color code or name. You must provide a valid color code or name,
     * as this function does not do any validation.
     */
    getColor(colorCode: string | number): THREE$1.Color;
    /**
     * Returns the number of elements in the cache.
     */
    get size(): number;
    /**
     * Clears the cache. Only references to the THREE.Color are removed from the cache.
     * Consequently, clearing the cache does not cause any negative visual impact.
     */
    clear(): void;
}

interface ConcurrentWorkerSetOptions {
    /**
     * The URL of the script for each worker to start.
     */
    scriptUrl: string;
    /**
     * The number of Web Workers for processing data.
     *
     * Defaults to CLAMP(`navigator.hardwareConcurrency` - 1, 1, 4) or [[DEFAULT_WORKER_COUNT]].
     */
    workerCount?: number;
    /**
     * Timeout in milliseconds, in which each worker should set initial message.
     *
     * @default 10 seconds, see [[DEFAULT_WORKER_INITIALIZATION_TIMEOUT]]
     */
    workerConnectionTimeout?: number;
}
/**
 * A set of concurrent Web Workers. Acts as a Communication Peer for [[WorkerService]] instances
 * running in Web Workers.
 *
 * Starts and manages a certain number of web workers and provides a means to communicate
 * with them using various communication schemes, such as:
 *  - [[addEventListener]] : receive a unidirectional messages
 *  - [[broadcastMessage]] : send unidirectional broadcast message
 *  - [[invokeRequest]] : send a request that waits for a response, with load balancing
 *  - [[postMessage]] : send a unidirectional message, with load balancing
 *
 * The request queue holds all requests before they are stuffed into the event queue, allows for
 * easy (and early) cancelling of requests. The workers now only get a single new RequestMessage
 * when they return their previous result, or if they are idle. When they are idle, they are stored
 * in m_availableWorkers.
 */
declare class ConcurrentWorkerSet {
    private m_options;
    private readonly m_workerChannelLogger;
    private readonly m_eventListeners;
    private m_workers;
    private m_availableWorkers;
    private m_workerPromises;
    private m_workerCount;
    private readonly m_readyPromises;
    private readonly m_requests;
    private m_workerRequestQueue;
    private m_nextMessageId;
    private m_stopped;
    private m_referenceCount;
    /**
     * Creates a new `ConcurrentWorkerSet`.
     *
     * Creates as many Web Workers as specified in `options.workerCount`, from the script provided
     * in `options.scriptUrl`. If `options.workerCount` is not specified, the value specified in
     * `navigator.hardwareConcurrency` is used instead.
     *
     * The worker set is implicitly started when constructed.
     */
    constructor(m_options: ConcurrentWorkerSetOptions);
    /**
     * Adds an external reference and increments the internal reference counter by one.
     *
     * To implement a reference-count based automatic resource cleanup, use this function with
     * [[removeReference]].
     */
    addReference(): void;
    /**
     * Decrements the internal reference counter by 1.
     *
     * When the internal reference counter reaches 0, this function calls [[dispose]] to clear the
     * resources.
     *
     * Use with [[addReference]] to implement reference-count based automatic resource cleanup.
     */
    removeReference(): void;
    /**
     * Starts workers.
     *
     * Use to start workers already stopped by [[stop]] or [[destroy]] calls.
     *
     * Note: The worker set is implicitly started on construction - no need to call [[start]] on
     * fresh instance.
     *
     * @param options - optional, new worker set options
     */
    start(options?: ConcurrentWorkerSetOptions): void;
    /**
     * The number of workers started for this worker set. The value is `undefined` until the workers
     * have been created.
     */
    get workerCount(): number | undefined;
    /**
     * Stops workers.
     *
     * Waits for all pending requests to be finished and stops all workers.
     *
     * Use [[start]] to start this worker again.
     *
     * @returns `Promise` that resolves when all workers are destroyed.
     */
    stop(): Promise<void>;
    /**
     * Destroys all workers immediately.
     *
     * Resolves all pending request promises with a `worker destroyed` error.
     *
     * Use [[start]] to start this worker again.
     */
    destroy(): void;
    /**
     * Is `true` if the workers have been terminated.
     */
    get terminated(): boolean;
    /**
     * Waits for `service` to be initialized in all workers.
     *
     * Each service that starts in a worker sends an [[isInitializedMessage]] to confirm that
     * it has started successfully. This method resolves when all workers in a set have
     * `service` initialized.
     *
     * Promise is rejected if any of worker fails to start.
     *
     * @param serviceId - The service identifier.
     */
    connect(serviceId: string): Promise<void>;
    /**
     * Registers an event listener for events that originated in a web worker, for a given
     * `serviceId`. You can only set one event listener per `serviceId`.
     *
     * @param serviceId - The service to listen to.
     * @param callback - The callback to invoke for matching events.
     */
    addEventListener(serviceId: string, callback: (message: any) => void): void;
    /**
     * Removes a previously set event listener for the given `serviceId`.
     *
     * @param serviceId - The service from which to remove the event listeners.
     */
    removeEventListener(serviceId: string): void;
    /**
     * Invokes a request that expects a response from a random worker.
     *
     * Sends [[RequestMessage]] and resolves when a matching [[ResponseMessage]] is received from
     * workers. Use this function when interfacing with "RPC-like" calls to services.
     *
     * @param serviceId - The name of service, as registered with the [[WorkerClient]] instance.
     * @param request - The request to process.
     * @param transferList - An optional array of `ArrayBuffer`s to transfer to the worker context.
     * @param requestController - An optional [[RequestController]] to store state of cancelling.
     *
     * @returns A `Promise` that resolves with a response from the service.
     */
    invokeRequest<Res>(serviceId: string, request: WorkerServiceProtocol.ServiceRequest, transferList?: ArrayBuffer[], requestController?: RequestController): Promise<Res>;
    /**
     * Invokes a request that expects responses from all workers.
     *
     * Send [[RequestMessage]]  to all workers and resolves when all workers have sent a matching
     * [[ResponseMessage]]. Use this function to wait on request that need to happen on all workers
     * before proceeding (like synchronous worker service creation).
     *
     * @param serviceId - The name of service, as registered with the [[WorkerClient]] instance.
     * @param request - The request to process.
     * @param transferList - An optional array of `ArrayBuffer`s to transfer to the worker context.
     *
     * @returns Array of `Promise`s that resolves with a response from each worker (unspecified
     * order).
     */
    broadcastRequest<Res>(serviceId: string, request: WorkerServiceProtocol.WorkerServiceManagerRequest | WorkerServiceProtocol.ServiceRequest, transferList?: ArrayBuffer[]): Promise<Res[]>;
    /**
     * Posts a message to all workers.
     *
     * @param message - The message to send.
     * @param buffers - Optional buffers to transfer to the workers.
     */
    broadcastMessage(message: any, buffers?: ArrayBuffer[] | undefined): void;
    /**
     * The size of the request queue for debugging and profiling.
     */
    get requestQueueSize(): number;
    /**
     * The number of workers for debugging and profiling.
     */
    get numWorkers(): number;
    /**
     * The number of workers for debugging and profiling.
     */
    get numIdleWorkers(): number;
    /**
     * Subclasses must call this function when a worker emits an event.
     *
     * @param event - The event to dispatch.
     */
    protected eventHandler(event: any): void;
    /**
     * Handles messages received from workers. This method is protected so that the message
     * reception can be simulated through an extended class, to avoid relying on real workers.
     *
     * @param workerId - The workerId of the web worker.
     * @param event - The event to dispatch.
     */
    private readonly onWorkerMessage;
    /**
     * Posts a [[WorkerServiceProtocol.RequestMessage]] to an available worker. If no worker is
     * available, the request is put into a queue.
     *
     * @param message - The message to send.
     * @param buffers - Optional buffers to transfer to the worker.
     * @param requestController - An optional [[RequestController]] to store state of cancelling.
     */
    private postRequestMessage;
    private ensureStarted;
    private waitForAllResponses;
    private dispatchEvent;
    private terminateWorkers;
    private getReadyPromise;
    /**
     * Check the worker request queue, if there are any queued up decoding jobs and idle workers,
     * they will be executed with postRequestMessage. The requests in the queue are sorted before
     * the request with the highest priority is selected for processing.
     */
    private checkWorkerRequestQueue;
}

/**
 * Default concurrent decoder helper.
 *
 * A convenient singleton that maintains a separate [[ConcurrentWorkerSet]] for each bundle
 * requested. Provides easy access to {@link WorkerBasedDecoder}s for data sources.
 */
declare class ConcurrentDecoderFacade {
    /**
     * The URL containing a script to fall back (default) to when looking for worker sets
     * and decoders.
     */
    static defaultScriptUrl: string;
    /**
     * The default number of workers.
     */
    static defaultWorkerCount?: number;
    /**
     * Returns a {@link WorkerBasedDecoder} instance.
     *
     * @param decoderServiceType - The name of the decoder service type.
     * @param scriptUrl - The optional URL with the workers' script.
     * @param workerCount - The number of web workers to use.
     * @param workerConnectionTimeout - Timeout in seconds to connect to the web worker.
     */
    static getTileDecoder(decoderServiceType: string, scriptUrl?: string, workerCount?: number, workerConnectionTimeout?: number): ITileDecoder;
    /**
     * Returns a [[ConcurrentWorkerSet]] instance based on the script URL specified.
     *
     * @param scriptUrl - The optional URL with the workers' script. If not specified,
     * the function uses [[defaultScriptUrl]] instead.
     * @param workerCount - The number of web workers to use.
     * @param workerConnectionTimeout - Timeout in seconds to connect to the web worker.
     */
    static getWorkerSet(scriptUrl?: string, workerCount?: number, workerConnectionTimeout?: number): ConcurrentWorkerSet;
    /**
     * Destroys a [[ConcurrentWorkerSet]] instance.
     *
     * @param scriptUrl - The worker script URL that was used to create the [[ConcurrentWorkerSet]].
     */
    static destroyWorkerSet(scriptUrl: string): void;
    /**
     * Destroys all managed [[ConcurrentWorkerSet]]s.
     */
    static destroy(): void;
    /**
     * Destroys this [[ConcurrentDecoderFacade]] if all of the [[ConcurrentWorkerSet]]s are
     * terminated.
     */
    static destroyIfTerminated(): void;
    /**
     * The [[ConcurrentWorkerSet]] instances which are stored by the script URL.
     */
    private static workerSets;
}

/**
 * Default concurrent tiler helper.
 *
 * A convenient singleton that maintains a separate [[ConcurrentWorkerSet]] for each bundle
 * requested. Provides easy access to {@link WorkerBasedTiler}s for data sources.
 */
declare class ConcurrentTilerFacade {
    /**
     * The URL containing a script to fall back (default) to when looking for worker sets
     * and tilers.
     */
    static defaultScriptUrl: string;
    /**
     * The default number of workers.
     */
    static defaultWorkerCount: number;
    /**
     * Returns a {@link WorkerBasedTiler} instance.
     *
     * @param tilerServiceType - The name of the tiler service type.
     * @param scriptUrl - The optional URL with the workers' script.
     * @param workerCount - The number of web workers to use.
     * @param workerConnectionTimeout - Timeout in seconds to connect to the web worker.
     */
    static getTiler(tilerServiceType: string, scriptUrl?: string, workerCount?: number, workerConnectionTimeout?: number): ITiler;
    /**
     * Returns a [[ConcurrentWorkerSet]] instance based on the script URL specified.
     *
     * @param scriptUrl - The optional URL with the workers' script. If not specified,
     * the function uses [[defaultScriptUrl]] instead.
     * @param workerCount - The number of web workers to use.
     * @param workerConnectionTimeout - Timeout in seconds to connect to the web worker.
     */
    static getWorkerSet(scriptUrl?: string, workerCount?: number, workerConnectionTimeout?: number): ConcurrentWorkerSet;
    /**
     * Destroys a [[ConcurrentWorkerSet]] instance.
     *
     * @param scriptUrl - The worker script URL that was used to create the [[ConcurrentWorkerSet]].
     */
    static destroyWorkerSet(scriptUrl: string): void;
    /**
     * Destroys all managed [[ConcurrentWorkerSet]]s.
     */
    static destroy(): void;
    /**
     * Destroys this [[ConcurrentTilerFacade]] if all of the [[ConcurrentWorkerSet]]s are
     * terminated.
     */
    static destroyIfTerminated(): void;
    /**
     * The [[ConcurrentWorkerSet]] instances which are stored by the script URL.
     */
    private static workerSets;
}

/**
 * Helper class that maintains up-to-date {@link MapView} copyright information in DOM element.
 *
 * @example
 *
 *     // HTML snippet
 *     <div id="copyrightNotice" style="position:absolute; right:0; bottom:0; z-index:100"></div>
 *
 *     // JavaScript
 *     const mapView = new MapView({ ... });
 *     CopyrightElementHandler.install("copyrightNotice", mapView);
 */
declare class CopyrightElementHandler {
    /**
     * Install {@link CopyrightElementHandler} on DOM element and - optionally -
     * attach to a {@link MapView} instance.
     *
     * @param element - HTML DOM element or a HTML DOM element id
     * @param mapView -, optional, [[attach]] to this {@link MapView}
     */
    static install(element: string | HTMLElement, mapView?: MapView): CopyrightElementHandler;
    /**
     * Static copyright info.
     *
     * Use when {@link MapView}'s {@link DataSource}'s do not provide proper copyright information.
     */
    staticInfo: CopyrightInfo[] | undefined;
    private readonly m_defaults;
    private m_element;
    private m_mapViews;
    /**
     * Creates a new `CopyrightElementHandler` that updates the DOM element with the copyright info
     * of the given `mapView`.
     *
     * Note: Generally, the static [[install]] method can be used to create and attach a new
     * `CopyrightElementHandler` to a {@link MapView}
     *
     * @param element - HTML DOM element or a HTML DOM element id
     * @param mapView - optional, [[attach]] to this {@link MapView} instance
     */
    constructor(element: string | HTMLElement, mapView?: MapView);
    /**
     * Destroys this object by removing all event listeners from the attached {@link MapView}s.
     */
    destroy(): void;
    /**
     * Attaches this {@link CopyrightInfo} updates from {@link MapView} instance.
     */
    attach(mapView: MapView): this;
    /**
     * Stop following {@link CopyrightInfo} updates from {@link MapView} instance.
     */
    detach(mapView: MapView): this;
    /**
     * Set {@link CopyrightInfo} defaults to be used in case
     * {@link DataSource} does not provide deatailed
     * copyright information.
     *
     * @remarks
     * The defaults will applied to all undefined `year`, `label` and `link` values in the copyright
     * information retrieved from {@link MapView}.
     */
    setDefaults(defaults: CopyrightInfo[] | undefined): this;
    /**
     * Sets the [[staticInfo]] property.
     *
     * A `CopyrightElementHandler` always displays a deduplicated sum of static copyright info and
     * copyright information obtained from attached {@link MapView}s.
     *
     * This information is used when {@link DataSource}
     * instances of given {@link MapView} do not provide
     * copyright information.
     */
    setStaticCopyightInfo(staticInfo: CopyrightInfo[] | undefined): this;
    /**
     * Update copyright info text in controlled HTML element.
     */
    update: () => void;
}

/**
 * `CopyrightProvider` is an interface to retrieve copyrights information for geographic region
 * specified by bounding box.
 */
interface CopyrightProvider {
    /**
     * Retrieves copyrights.
     *
     * @param geoBox - Bounding geo box to get copyrights for.
     * @param level - Zoom level to get copyrights for.
     * @returns Promise with an array of copyrights for this geo box.
     */
    getCopyrights(geoBox: GeoBox, level: number): Promise<CopyrightInfo[]>;
}

/**
 * Schema of [Map Tile API copyright
 * endpoint](https://developer.here.com/documentation/map-tile/topics/resource-copyright.html) JSON
 * response.
 */
interface AreaCopyrightInfo {
    /**
     * Minimum zoom level for the specified copyright label.
     */
    minLevel?: number;
    /**
     * Maximum zoom level for the specified copyright label.
     */
    maxLevel?: number;
    /**
     * Copyright text to display after the copyright symbol on the map.
     */
    label: string;
    /**
     * Verbose copyright text of the label to display by mouse over label or info menu entry.
     */
    alt?: string;
    /**
     * The bounding boxes define areas where specific copyrights are valid. A bounding box is
     * defined by bottom (latitude), left (longitude) and top (latitude), right (longitude).
     *
     * The default copyright has no boxes element and covers all other areas.
     */
    boxes?: Array<[number, number, number, number]>;
}
/**
 * Schema of [Map Tile API copyright
 * endpoint](https://developer.here.com/documentation/map-tile/topics/resource-copyright.html) JSON
 * response.
 */
interface CopyrightCoverageResponse {
    [scheme: string]: AreaCopyrightInfo[];
}
/**
 * Base class to provide copyrights based on copyright coverage information, defined by geographical
 * bounding boxes and relevant zoom level ranges.
 */
declare abstract class CopyrightCoverageProvider implements CopyrightProvider {
    /** Logger instance. */
    protected readonly logger: ILogger;
    private m_cachedTreePromise;
    /** Asynchronously retrieves copyright coverage data.
     * @param abortSignal - Optional AbortSignal to cancel the request.
     */
    abstract getCopyrightCoverageData(abortSignal?: AbortSignal): Promise<AreaCopyrightInfo[]>;
    /** @inheritdoc */
    getTree(): Promise<any>;
    /** @inheritdoc */
    getCopyrights(geoBox: GeoBox, level: number): Promise<CopyrightInfo[]>;
    /**
     * Initializes RBush.
     *
     * @param entries - Entries for tree.
     * @returns RBush instance.
     */
    initRBush(entries: AreaCopyrightInfo[]): any;
}

/** @module
 *
 * This module provides classes to ease downloading URLs. In particular, following redirects,
 * retrying on HTTP errors, and limiting the number of parallel concurrent downloads.
 */

/**
 * Abstract interface for a transfer manager.
 *
 * Provides functionality for downloading JSON or ArrayBuffers.
 * Implementations typically implement retry on server congestion,
 * limit the maximum amount of parallel downloads or merge duplicate
 * downloads.
 */
interface ITransferManager {
    /**
     * Downloads a JSON object.
     * @param url - The URL to download
     * @param init - Optional extra parameters for the download.
     */
    downloadJson<T>(url: RequestInfo, init?: RequestInit): Promise<T>;
    /**
     * Downloads a binary object.
     * @param url - The URL to download
     * @param init - Optional extra parameters for the download
     */
    downloadArrayBuffer(url: RequestInfo, init?: RequestInit): Promise<ArrayBuffer>;
    /**
     * Downloads a URL and returns the response.
     * @param url - The URL to download.
     * @param init - Optional extra parameters for the download.
     */
    download(url: RequestInfo, init?: RequestInit): Promise<Response>;
}

interface RequestHeaders$1 {
    [field: string]: string;
}
/**
 * Copyright provider which retrieves copyright coverage information from provided URL.
 */
declare class UrlCopyrightProvider extends CopyrightCoverageProvider {
    private readonly m_fetchURL;
    private readonly m_baseScheme;
    private m_requestHeaders?;
    private readonly m_transferManager;
    private m_cachedCopyrightResponse;
    /**
     * Default constructor.
     *
     * @param m_fetchURL - URL to fetch copyrights data from.
     * @param m_baseScheme - Scheme to get copyrights from.
     * @param m_requestHeaders - Optional request headers for requests(e.g. Authorization)
     */
    constructor(m_fetchURL: string, m_baseScheme: string, m_requestHeaders?: RequestHeaders$1 | undefined, m_transferManager?: ITransferManager);
    /**
     * Sets request headers.
     * @param headers -
     */
    setRequestHeaders(headers: RequestHeaders$1 | undefined): void;
    /**
     * @inheritdoc
     * @override
     */
    getCopyrightCoverageData(abortSignal?: AbortSignal): Promise<AreaCopyrightInfo[]>;
}

/**
 * Maintains a map of [[DebugOption]]s. You can add listeners to debug options by passing their
 * names.
 */
declare class DebugContext {
    private readonly m_optionsMap;
    /**
     * Builds a `DebugContext`.
     */
    constructor();
    /**
     * Sets the value of an option. Calls change listeners of that option, even if the value has
     * not been changed. The change listeners provided here are not called during this set
     * operation.
     *
     * @param name - Name of the option.
     * @param value - Value of the option.
     */
    setValue(name: string, value: any): void;
    /**
     * Gets the option value.
     *
     * @param name - Name of option.
     */
    getValue(name: string): any;
    /**
     * Determines if the option is registered.
     *
     * @param name - Name of option.
     */
    hasOption(name: string): boolean;
    /**
     * Adds a listener to a debug option.
     *
     * @param name - Name of the option that requires a listener.
     * @param listener - The listener function to add.
     */
    addEventListener(name: string, listener: (event: THREE$1.Event) => void): void;
    /**
     * Checks for a listener in a debug option.
     *
     * @param name - Name of the option to check for.
     * @param listener - The listener function to check for.
     */
    hasEventListener(name: string, listener: (event: THREE$1.Event) => void): boolean;
    /**
     * Removes a listener from a debug option.
     *
     * @param name - Name of the option from which to remove a listener.
     * @param listener - The listener function to remove.
     */
    removeEventListener(name: string, listener: (event: THREE$1.Event) => void): void;
    /**
     * Provides access to the options map. This method is useful for creating an automatic
     * browser GUI.
     */
    get options(): Map<string, any>;
    /**
     * Clears away all debug options. Currently, `THREE.EventDispatcher` does not provide an API
     * to remove all event listeners.
     */
    clear(): void;
}
declare const debugContext: DebugContext;

/**
 * Provides the most basic evaluation concept giving fixed values with some constraints.
 */
declare class FixedClipPlanesEvaluator implements ClipPlanesEvaluator {
    readonly minNear: number;
    readonly minFarOffset: number;
    readonly minFar: number;
    private m_nearPlane;
    private m_farPlane;
    constructor(minNear?: number, minFarOffset?: number);
    get nearPlane(): number;
    set nearPlane(fixedNear: number);
    get farPlane(): number;
    set farPlane(fixedFar: number);
    set minElevation(elevation: number);
    get minElevation(): number;
    set maxElevation(elevation: number);
    get maxElevation(): number;
    /** @override */
    evaluateClipPlanes(camera: THREE$1.Camera, projection: Projection, elevationProvider?: ElevationProvider): ViewRanges;
    private invalidatePlanes;
}

interface PolarTileDataSourceOptions extends DataSourceOptions {
    /**
     * Optional level offset of regular tiles from reference datasource to align tiles to.
     * Default is -1.
     */
    geometryLevelOffset?: number;
    /**
     * Enable debug display for generated tiles.
     * Default is false.
     */
    debugTiles?: boolean;
}
interface TechniqueEntry {
    technique: Technique;
    material: THREE$1.Material;
}
/**
 * {@link DataSource} providing geometry for poles
 */
declare class PolarTileDataSource extends DataSource {
    private readonly m_tilingScheme;
    private readonly m_maxLatitude;
    private m_geometryLevelOffset;
    private readonly m_debugTiles;
    private m_styleSetEvaluator?;
    private m_northPoleEntry?;
    private m_southPoleEntry?;
    constructor({ name, styleSetName, minDataLevel, maxDataLevel, minDisplayLevel, maxDisplayLevel, storageLevelOffset, geometryLevelOffset, debugTiles, }: PolarTileDataSourceOptions);
    /** @override */
    dispose(): void;
    createTechiqueEntry(kind: string): TechniqueEntry | undefined;
    /** @override */
    setTheme(theme: Theme): Promise<void>;
    /** @override */
    canGetTile(zoomLevel: number, tileKey: TileKey): boolean;
    /** @override */
    shouldSubdivide(zoomLevel: number, tileKey: TileKey): boolean;
    /** @override */
    getTilingScheme(): TilingScheme;
    /** @override */
    getTile(tileKey: TileKey): Tile;
    get geometryLevelOffset(): number;
    set geometryLevelOffset(geometryLevelOffset: number);
    private intersectEdge;
    private createTileGeometry;
}

/**
 * The structure of the options to pass into [[createMaterial]].
 */
interface MaterialOptions {
    /**
     * The shader [[Technique]] to choose.
     */
    technique: Technique;
    /**
     * Environment used to evaluate dynamic technique attributes.
     *
     * Usually {@link MapView.env}.
     */
    env: Env;
    /**
     * Properties to skip.
     *
     * @see [[applyTechniqueToMaterial]]
     */
    skipExtraProps?: string[];
    /**
     * `RawShaderMaterial` instances need to know about the fog at instantiation in order to avoid
     * recompiling them manually later (ThreeJS does not update fog for `RawShaderMaterial`s).
     */
    fog?: boolean;
    /**
     * Whether shadows are enabled or not, this is required because we change the material used.
     */
    shadowsEnabled?: boolean;
}
/**
 * Create a material, depending on the rendering technique provided in the options.
 *
 * @param rendererCapabilities - The capabilities of the renderer that will use the material.
 * @param options - The material options the subsequent functions need.
 * @param onTextureCreated - Optional callback for each texture created for the material, getting
 * a promise that will be resolved once the texture is loaded. Texture is not uploaded to GPU.
 *
 * @returns new material instance that matches `technique.name`.
 *
 * @internal
 */
declare function createMaterial(rendererCapabilities: THREE$1.WebGLCapabilities, options: MaterialOptions, onTextureCreated?: (texture: Promise<THREE$1.Texture>) => void): THREE$1.Material | undefined;
/**
 * Returns a [[THREE.BufferAttribute]] created from a provided
 * {@link @arcadecity/arcade-map/datasource-protocol#BufferAttribute} object.
 *
 * @param attribute - BufferAttribute a WebGL compliant buffer
 * @internal
 */
declare function getBufferAttribute(attribute: BufferAttribute): THREE$1.BufferAttribute;
/**
 * Determines if a technique uses THREE.Object3D instances.
 * @param technique - The technique to check.
 * @returns true if technique uses THREE.Object3D, false otherwise.
 * @internal
 */
declare function usesObject3D(technique: Technique): boolean;
/**
 * Builds the object associated with the given technique.
 *
 * @param technique - The technique.
 * @param geometry - The object's geometry.
 * @param material - The object's material.
 * @param tile - The tile where the object is located.
 * @param elevationEnabled - True if elevation is enabled, false otherwise.
 *
 * @internal
 */
declare function buildObject(technique: Technique, geometry: THREE$1.BufferGeometry, material: THREE$1.Material | THREE$1.Material[], tile: Tile, elevationEnabled: boolean): THREE$1.Object3D;
/**
 * Non material properties of `BaseTechnique`.
 * @internal
 */
declare const BASE_TECHNIQUE_NON_MATERIAL_PROPS: string[];
/**
 * Generic material type constructor.
 * @internal
 */
declare type MaterialConstructor = new (params: any) => THREE$1.Material;
/**
 * Returns a `MaterialConstructor` basing on provided technique object.
 *
 * @param technique - `Technique` object which the material will be based on.
 * @param shadowsEnabled - Whether the material can accept shadows, this is required for some
 *                         techniques to decide which material to create.
 *
 * @internal
 */
declare function getMaterialConstructor(technique: Technique, shadowsEnabled: boolean): MaterialConstructor | undefined;
/**
 * Convert metric style property to expression that accounts {@link MapView.pixelToWorld} if
 * `metricUnit === 'Pixel'`.
 * @internal
 */
declare function buildMetricValueEvaluator(value: Expr | Value | undefined, metricUnit: string | undefined): string | number | boolean | object | null | undefined;
/**
 * Allows to easy parse/encode technique's base color property value as number coded color.
 *
 * @remarks
 * Function takes care about property parsing, interpolation and encoding if neccessary.
 *
 * @see ColorUtils
 * @param technique - the technique where we search for base (transparency) color value
 * @param env - {@link @arcadecity/arcade-map/datasource-protocol#Env} instance
 *              used to evaluate {@link @arcadecity/arcade-map/datasource-protocol#Expr}
 *              based properties of `Technique`
 * @returns `number` encoded color value (in custom #TTRRGGBB) format or `undefined` if
 * base color property is not defined in the technique passed.
 *
 * @internal
 */
declare function evaluateBaseColorProperty(technique: Technique, env: Env): number | undefined;
/**
 * Apply technique color to material taking special care with transparent (RGBA) colors.
 *
 * @remarks
 * @note This function is intended to be used with secondary, triary etc. technique colors,
 * not the base ones that may contain transparency information. Such colors should be processed
 * with [[applyTechniqueBaseColorToMaterial]] function.
 *
 * @param technique - an technique the applied color comes from
 * @param material - the material to which color is applied
 * @param prop - technique property (color) name
 * @param value - color value
 * @param env - {@link @arcadecity/arcade-map/datasource-protocol#Env} instance used
 *              to evaluate {@link @arcadecity/arcade-map/datasource-protocol#Expr}
 *              based properties of `Technique`.
 *
 * @internal
 */
declare function applySecondaryColorToMaterial(materialColor: THREE$1.Color, techniqueColor: Value | Expr, env?: Env): void;
/**
 * Apply technique base color (transparency support) to material with modifying material opacity.
 *
 * @remarks
 * This method applies main (or base) technique color with transparency support to the corresponding
 * material color, with an effect on entire [[THREE.Material]] __opacity__ and __transparent__
 * attributes.
 *
 * @note Transparent colors should be processed as the very last technique attributes,
 * since their effect on material properties like [[THREE.Material.opacity]] and
 * [[THREE.Material.transparent]] could be overridden by corresponding technique params.
 *
 * @param technique - an technique the applied color comes from
 * @param material - the material to which color is applied
 * @param prop - technique property (color) name
 * @param value - color value in custom number format
 * @param env - {@link @arcadecity/arcade-map/datasource-protocol#Env} instance used to evaluate
 *              {@link @arcadecity/arcade-map/datasource-protocol#Expr} based properties of [[Technique]]
 *
 * @internal
 */
declare function applyBaseColorToMaterial(material: THREE$1.Material, materialColor: THREE$1.Color, technique: Technique, techniqueColor: Value, env?: Env): void;
/**
 * Calculates the numerical value of the technique defined color property.
 *
 * @remarks
 * Function takes care about color interpolation (when @param `env is set) as also parsing
 * string encoded colors.
 *
 * @note Use with care, because function does not recognize property type.
 * @param value - the value of color property defined in technique
 * @param env - {@link @arcadecity/arcade-map/datasource-protocol#Env} instance used to evaluate
 *              {@link @arcadecity/arcade-map/datasource-protocol#Expr} based properties of [[Technique]]
 * @internal
 */
declare function evaluateColorProperty(value: Value, env?: Env): number | undefined;

/**
 * Bitmask used for the depth pre-pass to prevent multiple fragments in the same screen position
 * from rendering color.
 * @internal
 */
declare const DEPTH_PRE_PASS_STENCIL_MASK = 1;
/**
 * Check if technique requires (and not disables) use of depth prepass.
 *
 * @remarks
 * Depth prepass is enabled if correct opacity is specified (in range `(0,1)`) _and_ not explicitly
 * disabled by `enableDepthPrePass` option.
 *
 * @param technique - `BaseStandardTechnique` instance to be checked
 * @param env - {@link @arcadecity/arcade-map/datasource-protocol#Env} instance used
 *              to evaluate {@link @arcadecity/arcade-map/datasource-protocol#Expr}
 *              based properties of `Technique`
 *
 * @internal
 */
declare function isRenderDepthPrePassEnabled(technique: ExtrudedPolygonTechnique, env: Env): boolean;
/**
 * Property identifying a material that is being used as a DepthPrePass material.
 */
interface DepthPrePassProperties {
    /**
     * This material is a special depth prepass material.
     */
    isDepthPrepassMaterial?: true;
}
/**
 * Creates material for depth prepass.
 *
 * @remarks
 * Creates material that writes only to the z-buffer. Updates the original material instance, to
 * support depth prepass.
 *
 * @param baseMaterial - The base material of mesh that is updated to work with depth prepass
 *     and then used. This parameter is a template for depth prepass material that is returned.
 * @returns depth prepass material, which is a clone of `baseMaterial` with the adapted settings.
 *
 * @internal
 */
declare function createDepthPrePassMaterial(baseMaterial: THREE$1.Material): THREE$1.Material;
/**
 * Checks if a given object is a depth prepass mesh.
 *
 * @param object - The object to check whether it's a depth prepass mesh.
 * @returns `true` if the object is a depth prepass mesh, `false` otherwise.
 *
 * @internal
 */
declare function isDepthPrePassMesh(object: THREE$1.Object3D): boolean;
/**
 * Clones a given mesh to render it in the depth prepass with another material.
 *
 * @remarks
 * Both the original
 * and depth prepass meshes, when rendered in the correct order, create the proper depth prepass
 * effect. The original mesh material is slightly modified by [[createDepthPrePassMaterial]] to
 * support the depth prepass. This method is usable only if the material of this mesh has an
 * opacity value in the range `(0,1)`.
 *
 * The DepthPrePass object is created wis a slightly smaller `renderOrder` as the original mesh
 * to ensure that it's rendered first.
 *
 * @param mesh - original mesh
 * @returns `Mesh` depth pre pass
 *
 * @internal
 */
declare function createDepthPrePassMesh(mesh: THREE$1.Mesh): THREE$1.Mesh;
/**
 * Sets up all the needed stencil logic needed for the depth pre-pass.
 *
 * @remarks
 * This logic is in place to avoid z-fighting artifacts that can appear in geometries that have
 * coplanar triangles inside the same mesh.
 *
 * @param depthMesh - Mesh created by `createDepthPrePassMesh`.
 * @param colorMesh - Original mesh.
 * @internal
 */
declare function setDepthPrePassStencil(depthMesh: THREE$1.Mesh, colorMesh: THREE$1.Mesh): void;

/**
 * @internal
 *
 * `ImageCache` is a singleton, so it can be used with multiple owners on a single page.
 *
 * @remarks
 * This allows to have an image loaded only once for multiple views.
 * THREE is doing something similar,
 * but does not allow to share images that have been loaded from a canvas (which we may need to do
 * if we use SVG images for textures).
 *
 * One application that makes our own cache necessary is the generation of our own textures from
 * data that is not an URL.
 *
 * The `ImageCache` can be improved by adding statistics for memory footprint as well.
 */
declare class ImageCache {
    /**
     * Returns the singleton `instance` of the `ImageCache`.
     */
    static get instance(): ImageCache;
    /**
     * Dispose the singleton object.
     *
     * @remarks
     * Not normally implemented for singletons, but good for debugging.
     */
    static dispose(): void;
    private static m_instance;
    private readonly m_images;
    /**
     * Add an image definition to the global cache. Useful when the image data is already loaded.
     *
     * @param owner - Specify which {@link any} requests the image.
     * @param url - URL of image.
     * @param image - Optional {@link TexturizableImage}.
     */
    registerImage(owner: any, url: string, image?: TexturizableImage): ImageItem;
    /**
     * Remove an image from the cache..
     *
     * @param url - URL of the image.
     * @param owner - Owner removing the image.
     * @returns `true` if image has been removed.
     */
    removeImage(url: string, owner: any): boolean;
    /**
     * Find {@link ImageItem} for the specified URL.
     *
     * @param url - URL of image.
     * @returns `ImageItem` for the URL if the URL is registered, `undefined` otherwise.
     */
    findImage(url: string): ImageItem | undefined;
    /**
     * Clear all {@link ImageItem}s belonging to an owner.
     *
     * @remarks
     * May remove cached items if no owner is registered anymore.
     *
     * @param owner - specify to remove all items registered by {@link any}.
     * @returns Number of images removed.
     */
    clear(owner: any): void;
    /**
     * Returns the number of all cached {@link ImageItem}s.
     */
    get size(): number;
    /**
     * Find the cached {@link ImageItem} by URL.
     *
     * @param url - URL of image.
     */
    private findImageCacheItem;
    /**
     * Cancel loading an image.
     *
     * @param imageItem - Item to cancel loading.
     */
    private cancelLoading;
    /**
     * Remove the cacheItem from cache, unless the item is used by another owner, in that case the
     * link to the owner is removed from the item, just like a reference count.
     *
     * @param cacheItem The cache item to be removed.
     * @param owner - Specify which owner removes the image.
     * If no owner is specified, the cache item is removed even if it has owners.
     */
    private unlinkCacheItem;
}

/**
 * Atmosphere effect variants.
 */
declare enum AtmosphereVariant {
    Ground = 1,
    Sky = 2,
    SkyAndGround = 3
}
/**
 * Atmosphere shader variants.
 */
declare enum AtmosphereShadingVariant {
    ScatteringShader = 0,
    SimpleColor = 1,
    Wireframe = 2
}
/**
 * Lists light modes.
 */
declare enum AtmosphereLightMode {
    LightOverhead = 0,
    LightDynamic = 1
}
/**
 * Class that provides {@link MapView}'s atmospheric scattering effect.
 */
declare class MapViewAtmosphere {
    private readonly m_mapAnchors;
    private readonly m_sceneCamera;
    private readonly m_projection;
    private readonly m_rendererCapabilities;
    private readonly m_updateCallback?;
    private readonly m_atmosphereVariant;
    private readonly m_materialVariant;
    /**
     * User data name attribute assigned to created mesh.
     */
    static SkyAtmosphereUserName: string;
    /**
     * User data name attribute assigned to created mesh.
     */
    static GroundAtmosphereUserName: string;
    /**
     * Check if map anchors have already atmosphere effect added.
     *
     * @param mapAnchors - MapAnchors to check.
     */
    static isPresent(mapAnchors: MapAnchors): boolean;
    private m_enabled;
    private m_skyGeometry?;
    private m_skyMaterial?;
    private m_skyMesh?;
    private m_groundGeometry?;
    private m_groundMaterial?;
    private m_groundMesh?;
    private readonly m_clipPlanesEvaluator;
    private readonly m_lightDirection;
    /**
     * Creates and adds `Atmosphere` effects to the scene.
     *
     * @note Currently works only with globe projection.
     *
     * @param m_mapAnchors - The {@link MapAnchors} instance where the effect will be added.
     * @param m_sceneCamera - The camera used to render entire scene.
     * @param m_projection - The geo-projection used to transform geo coordinates to
     *                       cartesian space.
     * @param m_rendererCapabilities The capabilities of the WebGL renderer.
     * @param m_updateCallback - The optional callback to that should be called whenever atmosphere
     * configuration changes, may be used to inform related components (`MapView`) to redraw.
     * @param m_atmosphereVariant - The optional atmosphere configuration variant enum
     * [[AtmosphereVariant]], which denotes where the atmosphere scattering effect should be
     * applied, it may be ground or sky atmosphere only or most realistic for both, which is
     * chosen by default.
     * @param m_materialVariant - The optional material variant to be used, mainly for
     * testing and tweaking purposes.
     */
    constructor(m_mapAnchors: MapAnchors, m_sceneCamera: THREE$1.Camera, m_projection: Projection, m_rendererCapabilities: THREE$1.WebGLCapabilities, m_updateCallback?: (() => void) | undefined, m_atmosphereVariant?: AtmosphereVariant, m_materialVariant?: AtmosphereShadingVariant);
    get skyMesh(): THREE$1.Mesh | undefined;
    get groundMesh(): THREE$1.Mesh | undefined;
    /**
     * Allows to enable/disable the atmosphere effect, regardless of the theme settings.
     *
     * Use this method to change the setup in runtime without defining corresponding theme setup.
     *
     * @param enable - A boolean that specifies whether the atmosphere should be enabled or
     *                 disabled.
     */
    set enabled(enable: boolean);
    /**
     * Returns the current atmosphere status, enabled or disabled.
     */
    get enabled(): boolean;
    set lightMode(lightMode: AtmosphereLightMode);
    /**
     * Disposes allocated resources.
     */
    dispose(): void;
    /**
     * Sets the atmosphere depending on the
     * {@link @arcadecity/arcade-map/datasource-protocol#Theme} instance provided.
     *
     * This function is called when a theme is loaded. Atmosphere is added only if the theme
     * contains a atmosphere definition with a:
     * - `color` property, used to set the atmosphere color.
     *
     * @param theme - A {@link @arcadecity/arcade-map/datasource-protocol#Theme} instance.
     */
    reset(theme: Theme): void;
    private get disposed();
    /**
     * Handles atmosphere effect adding.
     */
    private addToMapAnchors;
    /**
     * Handles atmosphere effect removal.
     */
    private removeFromMapAnchors;
    private createSkyGeometry;
    private createGroundGeometry;
    private setupSkyForRendering;
    private setupGroundForRendering;
    private overrideClipPlanes;
    private revertClipPlanes;
}

/**
 * Raycasting points is not supported as necessary in Three.js. This class extends a
 * [[THREE.Raycaster]] and adds the width / height of the canvas to allow picking of screen space
 * geometry.
 *
 * @internal
 */
declare class PickingRaycaster extends THREE$1.Raycaster {
    readonly canvasSize: THREE$1.Vector2;
    /**
     * Constructor.
     *
     * @param canvasSize - the canvas width and height.
     */
    constructor(canvasSize: THREE$1.Vector2);
    intersectObject(object: THREE$1.Object3D, recursive?: boolean, optionalTarget?: THREE$1.Intersection[]): THREE$1.Intersection[];
    intersectObjects(objects: THREE$1.Object3D[], recursive?: boolean, optionalTarget?: THREE$1.Intersection[]): THREE$1.Intersection[];
}

/**
 * `MapViewPoints` is a class to extend for the `"circles"` and `"squares"` techniques to
 * implement raycasting of `THREE.Points` as expected in {@link MapView},
 * that are in screen space.
 *
 * @remarks
 * It copies the behaviour of the `raycast` method in [[THREE.Points]] and dispatches it to its
 * children classes, {@link Circles} and {@link Squares}, who hold the intersection testing in the
 * `testPoint` method. This class also has the ability to dismiss the testing via the
 * `enableRayTesting` flag.
 *
 * Its main motivation is to handle the point styles of XYZ projects.
 *
 * @see https://github.com/mrdoob/three.js/blob/master/src/objects/Points.js
 *
 * @internal
 */
declare abstract class MapViewPoints extends THREE$1.Points {
    /**
     * This allows to discard the ray testing.
     */
    enableRayTesting: boolean;
    /**
     * Implements the intersection testing in screen space between the drawn points and the ray.
     *
     * @remarks The drawing of the points being different between {@link Circles}
     * and {@link Squares}, this method is implemented in these child classes.
     *
     * @param point - The point to test.
     * @param screenPosition - The point position on screen.
     * @param pickCoordinates - The picking position on screen.
     * @param index - The index of the point in the [[THREE.BufferGeometry]].
     * @param distance - The distance between the point and the ray origin.
     * @param intersects - The results array.
     */
    abstract testPoint(point: THREE$1.Vector3, screenPosition: THREE$1.Vector2, pickCoordinates: THREE$1.Vector2, index: number, distance: number, intersects: THREE$1.Intersection[]): void;
    /**
     * This method is similar to the original method `raycast` in [[THREE.Points]] except that it
     * then calls the tailored `testPoint` method in the children classes to test intersections
     * depending on whether the points are circles or squares, which [[THREE.Points]] cannot do.
     *
     * @param raycaster - The raycaster.
     * @param intersects - The array to fill with the results.
     */
    raycast(raycaster: PickingRaycaster, intersects: THREE$1.Intersection[]): void;
}
/**
 * Point object that implements the raycasting of circles in screen space.
 * @internal
 */
declare class Circles extends MapViewPoints {
    /** @override */
    testPoint(point: THREE$1.Vector3, screenPosition: THREE$1.Vector2, pickCoordinates: THREE$1.Vector2, index: number, distance: number, intersects: THREE$1.Intersection[]): void;
}
/**
 * Point object that implements the raycasting of squares in screen space.
 * @internal
 */
declare class Squares extends MapViewPoints {
    /** @override */
    testPoint(point: THREE$1.Vector3, screenPosition: THREE$1.Vector2, pickCoordinates: THREE$1.Vector2, index: number, distance: number, intersects: THREE$1.Intersection[]): void;
}

/**
 * A simple ring buffer to store the last `n` values of the timer. The buffer works on
 * a First-In-First-Out (FIFO) basis.
 */
declare class RingBuffer<T> {
    readonly capacity: number;
    buffer: T[];
    size: number;
    head: number;
    tail: number;
    /**
     * Sets up the ring buffer.
     *
     * @param capacity - The buffer's capacity.
     */
    constructor(capacity: number);
    /**
     * Clears the contents, removes all elements.
     */
    clear(): void;
    /**
     * Adds a single element to the ring buffer.
     *
     * @param data - Data element.
     */
    enqOne(data: T): void;
    /**
     * Adds one or more elements.
     *
     * @param data - The elements to add.
     */
    enq(...data: T[]): void;
    /**
     * Obtains the oldest element (FIFO). May throw an exception if a buffer underrun occurs.
     * Before calling this method, make sure that `size > 0`.
     */
    deq(): T;
    /**
     * Obtains the oldest element (FIFO) without removing it. Throws an exception if a buffer is
     * empty. Before calling this method, make sure that `size > 0`.
     */
    get top(): T;
    /**
     * Obtains the latest element (LIFO) without removing it. Throws an exception if a buffer is
     * empty. Before calling this method, make sure that `size > 0`.
     */
    get bottom(): T;
    /**
     * Creates an iterator for the buffer.
     */
    iterator(): RingBuffer.Iterator<T>;
    /**
     * Returns a copy of the buffer, where the elements are properly sorted from oldest to newest.
     */
    asArray(): T[];
}
declare namespace RingBuffer {
    /**
     * A local class for RingBuffer<T>
     */
    class Iterator<T> {
        private readonly m_buffer;
        private m_index;
        /**
         * Creates an iterator for the ring buffer.
         *
         * @param m_buffer - `Ringbuffer` to iterate over.
         * @param m_index - Start index.
         */
        constructor(m_buffer: RingBuffer<T>, m_index?: number);
        /**
         * Gets the iterator's current value. This function does not fail even if an overrun occurs.
         * To detect an overrun, watch the result for [[next]].
         */
        get value(): T;
        /**
         * Advances the iterator to the next element.
         *
         * @returns `true` if the iterator is still valid; `false` if an overrun occurs.
         */
        next(): boolean;
    }
}
/**
 * An interface for a Timer class, that abstracts the basic functions of a Timer.
 *
 * @remarks
 * Implemented by SimpleTimer, SampledTimer, and MultiStageTimer.
 *
 * @internal
 */
interface Timer {
    readonly name: string;
    readonly value?: number;
    /**
     * Resets value to be able to start again.
     */
    reset(): void;
    /**
     * Starts the timer. Returns the current time, based on `Performance.now()`.
     */
    start(): number;
    /**
     * Stops the timer. Requires that the timer has started.
     */
    stop(): number;
    /**
     * Samples the timer. Requires that the timer has started. This function does not modify
     * the timer's internal state.
     *
     * @returns Current timer value. `-1` if statistics are disabled.
     */
    now(): number;
    /**
     * Sets the measurement value for the amount of time that has elapsed from start() to stop().
     * Use this function to override the timer's duration.
     *
     * @param val - The timer's duration.
     */
    setValue(val: number | undefined): void;
}
/**
 * A simple timer that stores only the latest measurement.
 *
 * @internal
 */
declare class SimpleTimer implements Timer {
    statistics: Statistics;
    readonly name: string;
    /** `true` if timer has been started. */
    running: boolean;
    private m_currentValue?;
    constructor(statistics: Statistics, name: string);
    /**
     * Gets the latest measurement. This function may return `undefined` if no measurement
     * was done.
     */
    get value(): number | undefined;
    /**
     * Sets the measurement value for the amount of time that has elapsed from start() to stop().
     * Use this function to override the timer's duration.
     *
     * @param val - The timer's duration.
     */
    setValue(val: number | undefined): void;
    /**
     * Resets the value to be able to start again.
     */
    reset(): void;
    /**
     * Starts the timer. Returns the current time, based on `Performance.now()`.
     */
    start(): number;
    /**
     * Stops the timer. Requires that the timer has started.
     */
    stop(): number;
    /**
     * Samples the timer. Requires that the timer has started.
     *
     * @returns the current timer value; `-1` if statistics are disabled.
     */
    now(): number;
}
/**
 * Simple statistics about the values in an array.
 *
 * @internal
 */
interface Stats {
    /**
     * The lowest value in the array.
     */
    min: number;
    /**
     * The highest value in the array.
     */
    max: number;
    /**
     * The average duration of all values in the array.
     */
    avg: number;
    /**
     * The median duration of all values in the array.
     */
    median: number;
    /**
     * The 75th percentile median of all values in the array.
     */
    median75: number;
    /**
     * The 90th percentile median of all values in the array.
     */
    median90: number;
    /**
     * The 95th percentile median of all values in the array.
     */
    median95: number;
    /**
     * The 97th percentile median of all values in the array.
     */
    median97: number;
    /**
     * The 99th percentile median of all values in the array.
     */
    median99: number;
    /**
     * The 99.9th percentile median of all values in the array.
     */
    median999: number;
    /**
     * The number of values in the array.
     */
    numSamples: number;
}
/**
 * A timer that stores the last `n` samples in a ring buffer.
 *
 * @internal
 */
declare class SampledTimer extends SimpleTimer {
    statistics: Statistics;
    readonly name: string;
    /**
     * The number of times the timer has reset.
     */
    numResets: number;
    /**
     * Maximum samples until the statistics are reset and updated, which may destroy a median
     * computation.
     */
    maxNumSamples: number;
    /**
     * The array of sampled values, its length cannot exceed `maxNumSamples`.
     */
    samples: RingBuffer<number>;
    /**
     * Creates a `SampledTimer` instance. Must still be added to statistics if it should be logged!
     *
     * @param statistics - Statistics to use for management.
     * @param name - Name of the timer. Use colons to build a hierarchy.
     */
    constructor(statistics: Statistics, name: string);
    /**
     * Resets the timer and clears all of its historical values.
     * @override
     */
    reset(): void;
    /**
     * Add a single measurement to the sample.
     *
     * @param val - A measurement to add.
     * @override
     */
    setValue(val: number | undefined): void;
    /**
     * Updates the `min`, `max`, `avg`, and `median` values. Currently, this function is expensive,
     * as it requires a copy of the sampled values.
     */
    getStats(): Stats | undefined;
}
/**
 * Only exported for testing
 * @ignore
 *
 * @remarks
 * Compute the [[ArrayStats]] for the passed in array of numbers.
 *
 * @param {number[]} samples Array containing sampled values. Will be modified (!) by sorting the
 *      entries.
 * @returns {(Stats | undefined)}
 *
 * @internal
 */
declare function computeArrayStats(samples: number[]): Stats | undefined;
/**
 * Only exported for testing
 * @ignore
 *
 * @remarks
 * Compute the averages for the passed in array of numbers.
 *
 * @param {number[]} samples Array containing sampled values.
 * @returns {(Stats | undefined)}
 *
 * @internal
 */
declare function computeArrayAverage(samples: number[]): number | undefined;
/**
 * Measures a sequence of connected events, such as multiple processing stages in a function.
 *
 * @remarks
 * Each stage is identified with a timer name, that must be a valid timer in the statistics
 * object. Additionally, all timers within a `MultiStageTimer` must be unique.
 *
 * Internally, the `MultiStageTimer` manages a list of timers where at the end of each stage,
 * one timer stops and the next timer starts.
 *
 * @internal
 */
declare class MultiStageTimer {
    private readonly statistics;
    readonly name: string;
    stages: string[];
    private currentStage;
    /**
     * Defines the `MultiStageTimer` with a list of timer names that represent its stages.
     *
     * @param statistics - The statistics object that manages the timers.
     * @param name - Name of this `MultiStageTimer`.
     * @param stages - List of timer names.
     */
    constructor(statistics: Statistics, name: string, stages: string[]);
    /**
     * Gets the timer value for the last stage. If the `MultiStageTimer` did not finish its
     * last stage, the value is `undefined`.
     */
    get value(): number | undefined;
    /**
     * Resets the timers across all stages.
     */
    reset(): void;
    /**
     * Starts the `MultiStageTimer` at its first stage.
     */
    start(): number;
    /**
     * Stops the `MultiStageTimer`. Returns the measurement of the last stage, which may be
     * `undefined` if not all stages started.
     */
    stop(): number;
    /**
     * Gets the current stage.
     */
    get stage(): string | undefined;
    /**
     * Sets the current stage. If a new stage is provided, the current timer (if available) is
     * stopped, and the next timer is started. If the timer in the next stage is `undefined`,
     * this is equivalent to calling `stop` on the `MultiStageTimer`.
     *
     * @param stage - The next stage to start.
     */
    set stage(stage: string | undefined);
}
/**
 * Manages a set of timers.
 *
 * @remarks
 * The main objective of `Statistics` is to log these timers. You can
 * disable statistics to minimize their impact on performance.
 *
 * @internal
 */
declare class Statistics {
    name?: string | undefined;
    enabled: boolean;
    private readonly timers;
    private readonly nullTimer;
    /**
     * Sets up a group of timers.
     *
     * @param name - The statistics name, for logging purposes.
     * @param enabled - If `false`, the timers do not measure the performance.
     */
    constructor(name?: string | undefined, enabled?: boolean);
    /**
     * Adds a timer, based on the name specified.
     *
     * @param name - The timer's name; must be unique.
     */
    createTimer(name: string, keepSamples?: boolean): Timer;
    /**
     * Adds the timer specified.
     *
     * @param timer - The timer's name, which must be unique within this statistics object.
     */
    addTimer(timer: Timer): Timer;
    /**
     * Gets a timer by name.
     *
     * @param name - The timer's name.
     */
    getTimer(name: string): Timer;
    /**
     * Checks if a timer with the specified name already exists.
     *
     * @param name - The timer's name.
     * @returns `true` if a timer with `name` already exists; `false` otherwise.
     */
    hasTimer(name: string): boolean;
    /**
     * Resets all timers.
     */
    reset(): void;
    /**
     * Prints all values to the console.
     *
     * @param header - Optional header line.
     * @param footer - Optional footer line.
     */
    log(header?: string, footer?: string): void;
}
/**
 * Class containing all counters, timers and events of the current frame.
 *
 * @internal
 */
declare class FrameStats {
    readonly entries: Map<string, number>;
    messages?: string[];
    /**
     * Retrieve the value of the performance number.
     *
     * @param name - Name of the performance number.
     * @returns The value of the performance number or `undefined` if it has not been declared by
     *      `setValue` before.
     */
    getValue(name: string): number | undefined;
    /**
     * Set the value of the performance number.
     *
     * @param name - Name of the performance number.
     * @param name - New value of the performance number.
     */
    setValue(name: string, value: number): void;
    /**
     * Add a value to the current value of the performance number. If the performance is not known,
     * it will be initialized with `value`.
     *
     * @param name - Name of the performance number.
     * @param name - Value to be added to the performance number.
     */
    addValue(name: string, value: number): void;
    /**
     * Add a text message to the frame, like "Font XYZ has been loaded"
     *
     * @param message - The message to add.
     */
    addMessage(message: string): void;
    /**
     * Reset all known performance values to `0` and the messages to `undefined`.
     */
    reset(): void;
}
/**
 * @ignore
 * Only exported for testing.
 *
 * @remarks
 * Instead of passing around an array of objects, we store the frame statistics as an object of
 * arrays. This allows convenient computations from {@link RingBuffer},
 */
declare class FrameStatsArray {
    readonly capacity: number;
    readonly frameEntries: Map<string, RingBuffer<number>>;
    readonly messages: RingBuffer<string[] | undefined>;
    constructor(capacity?: number);
    get length(): number;
    reset(): void;
    addFrame(frameStats: FrameStats): void;
    /**
     * Prints all values to the console.
     */
    log(): void;
}
/**
 * @internal
 */
interface SimpleFrameStatistics {
    configs: Map<string, string>;
    appResults: Map<string, number>;
    frames: Map<string, number | number[]>;
    messages: Array<string[] | undefined>;
    frameStats?: Map<string, Stats | undefined>;
    zoomLevelLabels?: string[];
    zoomLevelData?: Map<string, number | number[]>;
}
/**
 * Performance measurement central.
 *
 * @remarks
 * Maintains the current. Implemented as an instance for easy access.
 *
 * {@link FrameStats}, which holds all individual performance numbers.
 *
 * @internal
 */
declare class PerformanceStatistics {
    enabled: boolean;
    maxNumFrames: number;
    /**
     * Returns `true` when the maximum number of storable frames is reached.
     *
     * @readonly
     * @type {boolean}
     * @memberof PerformanceStatistics
     */
    get isFull(): boolean;
    /**
     * Global instance to the instance. The current instance can be overridden by creating a new
     * `PerformanceStatistics`.
     */
    static get instance(): PerformanceStatistics;
    private static m_instance?;
    /**
     * Current frame statistics. Contains all values for the current frame. Will be cleared when
     * [[PerformanceStatistics#storeFrameInfo]] is called.
     *
     * @type {FrameStats}
     * @memberof PerformanceStatistics
     */
    readonly currentFrame: FrameStats;
    /**
     * @ignore
     * Only exported for testing.
     *
     * Return the array of frame events.
     */
    get frameEvents(): FrameStatsArray;
    /**
     * Additional results stored for the current application run, not per frame. Only the last value
     * is stored.
     *
     * @type {(Map<string, number>)}
     */
    readonly appResults: Map<string, number>;
    /**
     * Additional configuration values stored for the current application run, not per frame. Only
     * the last value is stored.
     *
     * @type {(Map<string, string>)}
     * @memberof PerformanceStatistics
     */
    readonly configs: Map<string, string>;
    private readonly m_frameEvents;
    /**
     * Creates an instance of PerformanceStatistics. Overrides the current `instance`.
     *
     * @param {boolean} [enabled=true] If `false` the performance values will not be stored.
     * @param {number} [maxNumFrames=1000] The maximum number of frames that are to be stored.
     * @memberof PerformanceStatistics
     */
    constructor(enabled?: boolean, maxNumFrames?: number);
    /**
     * Clears all settings, all stored frame events as well as the current frame values.
     *
     * @memberof PerformanceStatistics
     */
    clear(): void;
    /**
     * Clears only all stored frame events as well as the current frame values.
     *
     * @memberof PerformanceStatistics
     */
    clearFrames(): void;
    /**
     * Add the render state information from [[THREE.WebGLInfo]] to the current frame.
     * @param {THREE.WebGLInfo} webGlInfo
     */
    addWebGLInfo(webGlInfo: THREE$1.WebGLInfo): void;
    /**
     * Add memory statistics to the current frame if available.
     * @note Currently only supported on Chrome
     */
    addMemoryInfo(): void;
    /**
     * Stores the current frame events into the array of events and clears all values.
     *
     * @returns {boolean} Returns `false` if the maximum number of storable frames has been reached.
     * @memberof PerformanceStatistics
     */
    storeAndClearFrameInfo(): boolean;
    /**
     * Logs all values to the logger.
     *
     * @param header - Optional header line.
     * @param footer - Optional footer line.
     */
    log(header?: string, footer?: string): void;
    /**
     * Convert to a plain object that can be serialized. Required to copy the test results over to
     * nightwatch.
     */
    getAsPlainObject(onlyLastFrame?: boolean): any;
    /**
     * Convert the last frame values to a plain object that can be serialized. Required to copy the
     * test results over to nightwatch.
     */
    getLastFrameStatistics(): any;
    /**
     * Convert to a plain object that can be serialized. Required to copy the test results over to
     * nightwatch.
     */
    getAsSimpleFrameStatistics(onlyLastFrame?: boolean): SimpleFrameStatistics;
}

interface RequestHeaders {
    [field: string]: string;
}
/**
 * A texture loader that supports request headers(e.g. for Authorization)
 */
declare class TextureLoader {
    private readonly m_textureLoader;
    /**
     * Load an image from url and create a texture
     * @param url - URL to the image
     * @param requestHeaders - Optional request headers to load image(e.g. Authorization)
     * @param abortSignal - Optional AbortSignal to cancel the load.
     * @param crossOrigin - Enable/disable CORS
     */
    load(url: string, requestHeaders?: RequestHeaders | undefined, abortSignal?: AbortSignal, crossOrigin?: boolean): Promise<THREE$1.Texture>;
    private loadWithThreeLoader;
}

/**
 * @internal
 */
declare const DEFAULT_MAX_THEME_INTHERITANCE_DEPTH = 4;
/**
 * Options to customize {@link @arcadecity/arcade-map/datasource-protocol#Theme} loading process.
 *
 * @see {@link ThemeLoader.load}
 */
interface ThemeLoadOptions {
    /**
     * Whether to resolve `ref` expressions in `definition` and `styles` elements.
     *
     * @default `false`, as datasources resolve definitions in [[StyleSetEvaluator]].
     */
    resolveDefinitions?: boolean;
    /**
     * Resolve the URIs to resources like fonts, icons, ...
     * If true, [[uriResolver]] will be used to resolve the URI
     * @default true
     */
    resolveResourceUris?: boolean;
    /**
     * Resolve the URIs of inherited themes (using `extends` feature).
     * If true, [[uriResolver]] will be used to resolve the URI
     * @default true
     */
    resolveIncludeUris?: boolean;
    /**
     * An `AbortSignal` object instance; allows you to communicate with a loading process
     * (including fetch requests) request and abort it if desired via an `AbortController`.
     *
     * Modeled after Web APIs `fetch`s `init.signal`.
     *
     * @see https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
     * @see https://developer.mozilla.org/en-US/docs/Web/API/AbortController
     */
    signal?: AbortSignal;
    /**
     * Maximum recursion depth when resolving base themes
     * through [{@link @arcadecity/arcade-map/datasource-protocol#Theme}s `extends` property.
     *
     * @default [[DEFAULT_MAX_THEME_INTHERITANCE_DEPTH]]
     */
    maxInheritanceDepth?: number;
    /**
     * Custom logging channel on which diagnostics and warnings will be reported.
     *
     * If not specified, {@link ThemeLoader.load} will log to `console`.
     */
    logger?: ISimpleChannel;
    /**
     * Resolve asset `URI`s referenced in `Theme` assets using this resolver.
     */
    uriResolver?: UriResolver;
}
/**
 * Loads and validates a theme from URL objects.
 */
declare class ThemeLoader {
    /**
     * Loads a {@link @arcadecity/arcade-map/datasource-protocol#Theme} from a
     * remote resource, provided as a URL that points to a
     * JSON-encoded theme.
     *
     * By default, resolves following features of theme:
     *
     *  -  `extends` - loads and merges all inherited themes (see [[resolveBaseTheme]])
     *  -  `ref` - resolves all `ref` instances to their values defined in `definitions` section
     *     of theme (see [[resolveThemeReferences]])
     *
     * Relative URIs of reference resources are resolved to full URL using the document's base URL
     * (see [[resolveUrls]]).
     *
     * Custom URIs (of theme itself and of resources referenced by theme) may be resolved with by
     * providing {@link @arcadecity/arcade-map/utils#UriResolver} using {@link ThemeLoadOptions.uriResolver}
     * option.
     *
     * @param theme - {@link @arcadecity/arcade-map/datasource-protocol#Theme} instance or theme URL
     *                to the theme.
     * @param options - Optional, a {@link ThemeLoadOptions} objects
     *                  containing any custom settings for
     *                  this load request.
     */
    static load(theme: string | Theme, options?: ThemeLoadOptions): Promise<Theme>;
    /**
     * Checks if `theme` instance is completely loaded, meaning that `extends` property is resolved.
     *
     * @param theme -
     */
    static isThemeLoaded(theme: Theme): boolean;
    /**
     * @deprecated Please use `ThemeLoader.load`
     *
     * Loads a {@link @arcadecity/arcade-map/datasource-protocol#Theme} from a remote resource,
     * provided as a URL that points to a JSON-encoded
     * theme.
     *
     * @param themeUrl - The URL to the theme.
     *
     */
    static loadAsync(themeUrl: string): Promise<Theme>;
    /**
     * Resolves all {@link @arcadecity/arcade-map/datasource-protocol#Theme}'s relatives URLs
     * to full URL using the {@link @arcadecity/arcade-map/datasource-protocol#Theme}'s URL
     * (see: https://www.w3.org/TR/WD-html40-970917/htmlweb.html#h-5.1.2).
     *
     * This method mutates original `theme` instance.
     *
     * @param theme - The {@link @arcadecity/arcade-map/datasource-protocol#Theme} to resolve.
     */
    private static resolveUrls;
    /**
     * Expand all `ref` expressions in {@link @arcadecity/arcade-map/datasource-protocol#Theme}
     * basing on `definitions`.
     *
     * @remarks
     * This method mutates original `theme` instance.
     */
    private static resolveThemeReferences;
    /**
     * Expand all `ref` in [[StyleSet]] basing on `definitions`.
     */
    private static resolveStyles;
    /**
     * Expand all `ref` in [[Style]] instance basing on `definitions`.
     */
    private static resolveStyle;
    /**
     * Resolve `[ref, ...]` in expressions.
     *
     * Returns `undefined` some reference was invalid (missing or wrong type).
     */
    private static resolveExpressionReferences;
    /**
     * Realize `extends` clause by merging `theme` with
     * its base {@link @arcadecity/arcade-map/datasource-protocol#Theme}.
     *
     * @param theme - {@link @arcadecity/arcade-map/datasource-protocol#Theme} object
     * @param options - Optional, a {@link ThemeLoadOptions} objects
     *                  containing any custom settings for
     *                  this load request.
     */
    private static resolveBaseThemes;
    private static mergeThemes;
    private static mergeImageTextures;
    private static resolveResources;
}

/**
 * Interface to access lines. Allows read access for some important attributes.
 */
interface ILineAccessor {
    /**
     * Hint for the original type of geometry.
     */
    geometryType: GeometryType;
    /**
     * Get the color from materials.
     */
    color: THREE$1.Color | undefined | Array<THREE$1.Color | undefined>;
    /**
     * Get the width. May have to be reconstructed from triangulated line mesh.
     */
    width: number | undefined;
    /**
     * Render order.
     */
    renderOrder: number;
    /**
     * Helper for function `isLineAccessor`.
     *
     * @returns `true` if it is a line accessor.
     */
    isLineAccessor(): boolean;
    /**
     * Clear the object from the mesh.
     */
    clear(): void;
    /**
     * Get vertices from the object.
     */
    getVertices(): Float32Array | undefined;
}
/**
 * Helper function to check if an accessor is of type `ILineAccessor`.
 *
 * @param arg - `true` if `arg` is `ILineAccessor`.
 * @internal
 */
declare function isLineAccessor(arg: any): arg is ILineAccessor;
/**
 * Accessor for unspecified 3D objects, like landmarks.
 */
interface IObject3dAccessor {
    /**
     * Hint for the original type of geometry.
     */
    geometryType: GeometryType;
    /**
     * Get the color from materials.
     */
    color: THREE$1.Color | undefined | Array<THREE$1.Color | undefined>;
    /**
     * Render order.
     */
    renderOrder: number;
    /**
     * Helper for function `isObject3dAccessor`.
     *
     * @returns `true` if it is a line accessor.
     */
    isObject3dAccessor(): boolean;
    /**
     * Clear the object from the mesh.
     */
    clear(): void;
    getVertices(): Float32Array | undefined;
}
/**
 * Helper function to check if an accessor is of type `IObject3dAccessor`.
 *
 * @param arg - `true` if `arg` is `IObject3dAccessor`.
 * @internal
 */
declare function isObject3dAccessor(arg: any): arg is IObject3dAccessor;
/**
 * Basic interface for geometry accessors.
 */
interface IGeometryAccessor {
    /**
     * Get the number of primitives (vertices of triangles).
     *
     * @returns Number of primitives.
     */
    getCount(): number;
    /**
     * Set range of primitives in this object related to one or more buffers.
     *
     * @param start - Start index in buffers.
     * @param end - End index in buffers (+1).
     */
    setRange(start: number, end: number): void;
}
/**
 * Geometry accessor for both indexed and nonindexed `BufferedGeometry`.
 */
declare abstract class BufferedGeometryAccessorBase implements IGeometryAccessor {
    readonly object: THREE$1.Mesh;
    readonly geometryType: GeometryType;
    protected readonly bufferGeometry: THREE$1.BufferGeometry;
    protected start: number;
    protected end: number;
    protected startCapSize: number;
    protected endCapSize: number;
    protected position: THREE$1.BufferAttribute;
    protected itemSize: number;
    constructor(object: THREE$1.Mesh, geometryType: GeometryType, bufferGeometry: THREE$1.BufferGeometry);
    /**
     * Get the number of accessible geometries in this buffer.
     *
     * @returns Number of primitives in this geometry.
     */
    getCount(): number;
    /**
     * Get `renderOrder` of object.
     *
     * @returns `renderOrder` of the object.
     */
    get renderOrder(): number;
    setRange(start: number, end: number, startCapSize?: number, endCapSize?: number): void;
    /**
     * Get one or more colors from materials.
     */
    get color(): THREE$1.Color | undefined | Array<THREE$1.Color | undefined>;
}
/**
 * Abstract base class of an accessor for nonindexed geometry.
 */
declare abstract class BufferedGeometryAccessor extends BufferedGeometryAccessorBase {
    readonly object: THREE$1.Mesh;
    readonly geometryType: GeometryType;
    protected readonly bufferGeometry: THREE$1.BufferGeometry;
    protected stride: number;
    /**
     * Create an object of type `BufferedGeometryAccessor`
     *
     * @param object - mesh object
     * @param geometryType - type of geometry to be used
     * @param bufferGeometry - which buffer geometry to use
     * @param stride - geometry stride length
     */
    constructor(object: THREE$1.Mesh, geometryType: GeometryType, bufferGeometry: THREE$1.BufferGeometry, stride: number);
    clear(): void;
    getVertices(): Float32Array | undefined;
    protected checkSetUp(): boolean;
}
/**
 * Accessor for nonindexed line geometry.
 */
declare class BufferedGeometryLineAccessor extends BufferedGeometryAccessor implements ILineAccessor {
    readonly object: THREE$1.Mesh;
    readonly geometryType: GeometryType;
    readonly bufferGeometry: THREE$1.BufferGeometry;
    constructor(object: THREE$1.Mesh, geometryType: GeometryType, bufferGeometry: THREE$1.BufferGeometry);
    isLineAccessor(): boolean;
    get width(): number | undefined;
}
/**
 * Accessor for nonindexed unspecified (`Object3D`) geometry.
 */
declare class BufferedGeometryObject3dAccessor extends BufferedGeometryAccessor implements IObject3dAccessor {
    readonly object: THREE$1.Mesh;
    readonly geometryType: GeometryType;
    readonly bufferGeometry: THREE$1.BufferGeometry;
    constructor(object: THREE$1.Mesh, geometryType: GeometryType, bufferGeometry: THREE$1.BufferGeometry);
    isObject3dAccessor(): boolean;
    /** @override */
    getVertices(): Float32Array | undefined;
}
/**
 * Abstract base class of indexed geometry.
 */
declare abstract class IndexedBufferedGeometryAccessor extends BufferedGeometryAccessorBase {
    readonly object: THREE$1.Mesh;
    readonly geometryType: GeometryType;
    protected readonly bufferGeometry: THREE$1.BufferGeometry;
    indices: number[];
    /**
     * Creates an abstract class `IndexedBufferedGeometryAccessor`.
     *
     * @param object - mesh to be used
     * @param geometryType - type of geometry
     * @param bufferGeometry - geometry used
     * @param start -
     * @param end -
     */
    constructor(object: THREE$1.Mesh, geometryType: GeometryType, bufferGeometry: THREE$1.BufferGeometry, start?: number, end?: number);
    /**
     * Returns number of primitives, which is not known in this base class, so we return the number
     * of indices.
     *
     * @returns The number of indices in the geometry.
     * @override
     */
    getCount(): number;
    protected checkSetUp(): boolean;
}
/**
 * Accessor for lines in an indexed geometry.
 */
declare class IndexedBufferedGeometryLineAccessor extends IndexedBufferedGeometryAccessor implements ILineAccessor {
    readonly object: THREE$1.Mesh;
    readonly geometryType: GeometryType;
    readonly bufferGeometry: THREE$1.BufferGeometry;
    constructor(object: THREE$1.Mesh, geometryType: GeometryType, bufferGeometry: THREE$1.BufferGeometry);
    isLineAccessor(): boolean;
    /**
     * Reconstructs line width from triangulated geometry.
     *
     * @returns Line width.
     */
    get width(): number | undefined;
    clear(): void;
    getVertices(): Float32Array | undefined;
}

/**
 * Interface for a client visitor that is used to visit all `THREE.Object`s in a tile.
 */
interface ITileDataVisitor {
    tile: Tile;
    /**
     * Should return `true` if the visitor wants to visit the object with the specified
     * `featureId`. This function is called before the type of the object is even known.
     * @remarks Number ids are deprecated in favor of strings.
     */
    wantsFeature(featureId: number | string | undefined): boolean;
    /**
     * Should return `true` if the visitor wants to visit the point with the specified
     * `featureId`.
     * @remarks Number ids are deprecated in favor of strings.
     */
    wantsPoint(featureId: number | string | undefined): boolean;
    /**
     * Should return `true` if the visitor wants to visit the line with the specified
     * `featureId`.
     * @remarks Number ids are deprecated in favor of strings.
     */
    wantsLine(featureId: number | string | undefined): boolean;
    /**
     * Should return `true` if the visitor wants to visit the area object with the specified
     * `featureId`.
     * @remarks Number ids are deprecated in favor of strings.
     */
    wantsArea(featureId: number | string | undefined): boolean;
    /**
     * Should return `true` if the visitor wants to visit the object with the specified
     * `featureId`.
     * @remarks Number ids are deprecated in favor of strings.
     */
    wantsObject3D(featureId: number | string | undefined): boolean;
    /**
     * Visits a point object with the specified `featureId`; use `pointAccessor` to get the
     * object's properties.
     * @remarks Number ids are deprecated in favor of strings.
     */
    visitPoint(featureId: number | string | undefined): void;
    /**
     * Visits a line object with the specified `featureId`; use `pointAccessor` to get the
     * object's properties.
     * @remarks Number ids are deprecated in favor of strings.
     */
    visitLine(featureId: number | string | undefined, lineAccessor: ILineAccessor): void;
    /**
     * Visit an area object with the specified `featureId`; use `pointAccessor` to get the
     * object's properties.
     * @remarks Number ids are deprecated in favor of strings.
     */
    visitArea(featureId: number | string | undefined): void;
    /**
     * Visits a 3D object with the specified `featureId`; use `pointAccessor` to get the
     * object's properties.
     * @remarks Number ids are deprecated in favor of strings.
     */
    visitObject3D(featureId: number | string | undefined, object3dAccessor: IObject3dAccessor): void;
}
/**
 * An interface that provides options for {@link TileDataAccessor}.
 */
interface TileDataAccessorOptions {
    /** Limit to objects that have `featureID`s. */
    onlyWithFeatureIds?: boolean;
    /** Sets and overrides `wantPoints`, `wantLines`, `wantAreas`, `wantObject3D`. */
    wantsAll?: boolean;
    /** `true` to visit points. */
    wantsPoints?: boolean;
    /** `true` to visit lines. */
    wantsLines?: boolean;
    /** `true` to visit area objects. */
    wantsAreas?: boolean;
    /** `true` to visit general 3D objects. */
    wantsObject3D?: boolean;
}
/**
 * An accessor for all geometries in a tile.
 *
 * @remarks
 * This class uses a client-provided {@link ITileDataVisitor}
 * to visit all objects, based on filtering options specified
 * by both, the `TileDataAccessor` and
 * the visitor itself.
 */
declare class TileDataAccessor {
    tile: Tile;
    private readonly visitor;
    private readonly m_wantsPoints;
    private readonly m_wantsLines;
    private readonly m_wantsAreas;
    private readonly m_wantsObject3D;
    /**
     * Constructs a `TileDataAccessor` instance.
     *
     * @param tile - The tile to access.
     * @param visitor - The visitor.
     * @param options - Options for the tile.
     */
    constructor(tile: Tile, visitor: ITileDataVisitor, options: TileDataAccessorOptions);
    /**
     * Calls the visitor on all objects in the tile.
     */
    visitAll(): void;
    /**
     * Visits a single object. This function should normally be called during visiting.
     *
     * @param object - The object to visit.
     */
    protected visitObject(object: THREE$1.Object3D): void;
    /**
     * Gets the `BufferGeometry` from the specified object. This function requires the
     * attribute `position` in `BufferGeometry` to be set.
     *
     * @param object - The object from which to get the geometry.
     * @returns the geometry of the object, or `undefined`.
     */
    protected getBufferGeometry(object: THREE$1.Mesh): THREE$1.BufferGeometry | undefined;
    /**
     * Obtains an accessor for the nonindexed geometry. This function may return `undefined`
     * if the accessor is not implemented.
     *
     * @param geometryType - The type of geometry.
     * @param object - The object for which to access the attributes and geometry.
     * @param bufferGeometry - The object's `BufferGeometry`.
     * @returns an accessor for a specified object, if available.
     */
    protected getGeometryAccessor(geometryType: GeometryType, object: THREE$1.Mesh, bufferGeometry: THREE$1.BufferGeometry): IGeometryAccessor | undefined;
    /**
     * Obtains an accessor for the indexed geometry. This function may return `undefined`
     * if the accessor is not implemented.
     *
     * @param geometryType - The type of geometry.
     * @param object - The object for which to access the attributes and geometry.
     * @param bufferGeometry - The object's `BufferGeometry`.
     * @returns an accessor for a specified object, if available.
     */
    protected getIndexedGeometryAccessor(geometryType: GeometryType, object: THREE$1.Mesh, bufferGeometry: THREE$1.BufferGeometry): IGeometryAccessor | undefined;
    /**
     * Visit the object.
     *
     * @param meshObject - Object of type `Mesh`.
     * @param featureData - Dataset stored along with the object.
     */
    protected visitMesh(meshObject: THREE$1.Mesh, featureData: TileFeatureData): void;
}

/**
 * Parameters that control fading.
 */
interface FadingParameters {
    fadeNear?: number;
    fadeFar?: number;
}
/**
 * Parameters that control fading for extruded buildings with fading edges.
 */
interface PolygonFadingParameters extends FadingParameters {
    color?: string | number;
    colorMix?: number;
    lineFadeNear?: number;
    lineFadeFar?: number;
}
/**
 * Support class to create geometry for a {@link Tile} from a {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile}.
 * @internal
 */
declare class TileGeometryCreator {
    private static m_instance;
    /**
     * The `instance` of the `TileGeometryCreator`.
     *
     * @returns TileGeometryCreator
     */
    static get instance(): TileGeometryCreator;
    /**
     *  Creates an instance of TileGeometryCreator. Access is allowed only through `instance`.
     */
    private constructor();
    /**
     * Apply `enabledKinds` and `disabledKinds` to all techniques in the `decodedTile`. If a
     * technique is identified as disabled, its property `enabled` is set to `false`.
     *
     * @param decodedTile - The decodedTile containing the actual tile map data.
     * @param enabledKinds - Optional [[GeometryKindSet]] used to specify which object kinds should be
     *      created.
     * @param disabledKinds - Optional [[GeometryKindSet]] used to filter objects that should not be
     *      created.
     */
    initDecodedTile(decodedTile: DecodedTile, enabledKinds?: GeometryKindSet | undefined, disabledKinds?: GeometryKindSet | undefined): void;
    /**
     * Called after the `Tile` has been decoded. It is required to call `initDecodedTile` before
     * calling this method.
     *
     * @see [[TileGeometryCreator#initDecodedTile]]
     *
     * @param tile - The {@link Tile} to process.
     * @param decodedTile - The decodedTile containing the actual tile map data.
     * @returns Promise resolved when all textures are ready to render.
     */
    createAllGeometries(tile: Tile, decodedTile: DecodedTile): Promise<void>;
    createLabelRejectionElements(tile: Tile, decodedTile: DecodedTile): void;
    /**
     * Processes the given tile and assign default values for geometry kinds,
     * render orders and label priorities.
     *
     * @param {Tile} tile
     * @param {(GeometryKindSet | undefined)} enabledKinds
     * @param {(GeometryKindSet | undefined)} disabledKinds
     */
    processTechniques(tile: Tile, enabledKinds: GeometryKindSet | undefined, disabledKinds: GeometryKindSet | undefined): void;
    /**
     * Splits the text paths that contain sharp corners.
     *
     * @param tile - The {@link Tile} to process paths on.
     * @param textPathGeometries - The original path geometries that may have defects.
     * @param textFilter -: Optional filter. Should return true for any text technique that is
     *      applicable.
     */
    prepareTextPaths(textPathGeometries: TextPathGeometry[], decodedTile: DecodedTile, textFilter?: (technique: IndexedTechnique) => boolean): TextPathGeometry[];
    /**
     * Creates {@link TextElement} objects from the decoded tile and list of materials specified. The
     * priorities of the {@link TextElement}s are updated to simplify label placement.
     *
     * @param tile - The {@link Tile} to create the testElements on.
     * @param decodedTile - The {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile}.
     * @param textFilter -: Optional filter. Should return true for any text technique that is
     *      applicable.
     */
    createTextElements(tile: Tile, decodedTile: DecodedTile, textFilter?: (technique: IndexedTechnique) => boolean): void;
    /**
     * Creates `Tile` objects from the decoded tile and list of materials specified.
     *
     * @param tile - The {@link Tile} to create the geometry on.
     * @param decodedTile - The {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile}.
     * @param onTextureCreated - Callback for each texture created, getting a promise that will be
     * resolved once the texture is loaded. Texture is not uploaded to GPU.
     * @param techniqueFilter -: Optional filter. Should return true for any technique that is
     *      applicable.
     */
    createObjects(tile: Tile, decodedTile: DecodedTile, onTextureCreated: (texture: Promise<THREE$1.Texture>) => void, techniqueFilter?: (technique: IndexedTechnique) => boolean): void;
    /**
     * Prepare the {@link Tile}s pois. Uses the {@link PoiManager} in {@link MapView}.
     */
    preparePois(tile: Tile, decodedTile: DecodedTile): void;
    /**
     * Gets the attachments of the given {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile}.
     *
     * @param decodedTile - The {@link @arcadecity/arcade-map/datasource-protocol#DecodedTile}.
     */
    private getAttachments;
    private setupTerrainMaterial;
    private addUserData;
    /**
     * Gets the fading parameters for several kinds of objects.
     */
    private getFadingParams;
    /**
     * Gets the fading parameters for several kinds of objects.
     */
    private getPolygonFadingParams;
}

/**
 * Decoder based on [[ConcurrentWorkerSet]].
 *
 * Decodes tiles using workers running in separate contexts (also known as `WebWorkers`):
 * - connection establishment,
 * - sends decode requests,
 * - configuration.
 */
declare class WorkerBasedDecoder implements ITileDecoder {
    private readonly workerSet;
    private readonly decoderServiceType;
    private readonly serviceId;
    private m_serviceCreated;
    /**
     * Creates a new `WorkerBasedDecoder`.
     *
     * @param workerSet - [[ConcurrentWorkerSet]] this tiler will live in.
     * @param decoderServiceType - Service type identifier.
     */
    constructor(workerSet: ConcurrentWorkerSet, decoderServiceType: string);
    /**
     * Dispose of dedicated tile decoder services in workers and remove reference to underlying
     * [[ConcurrentWorkerSet]].
     */
    dispose(): void;
    /**
     * Connects to [[WorkerServiceManager]]s in underlying [[ConcurrentWorkerSet]] and creates
     * dedicated [[TileDecoderService]]s in all workers to serve decode requests.
     */
    connect(): Promise<void>;
    /**
     * Get {@link Tile} from tile decoder service in worker.
     *
     * @remarks
     * Invokes {@link @arcadecity/arcade-map/datasource-protocol#DecodeTileRequest} on
     * [[TileDecoderService]] running in worker pool.
     */
    decodeTile(data: ArrayBufferLike, tileKey: TileKey, projection: Projection, requestController?: RequestController): Promise<DecodedTile>;
    /**
     * Get {@link @arcadecity/arcade-map/datasource-protocol#TileInfo} from tile decoder service in worker.
     *
     * @remarks
     * Invokes {@link @arcadecity/arcade-map/datasource-protocol#TileInfoRequest}
     * on [[TileDecoderService]] running in worker pool.
     */
    getTileInfo(data: ArrayBufferLike, tileKey: TileKey, projection: Projection, requestController?: RequestController): Promise<TileInfo | undefined>;
    /**
     * Configure tile decoder service in workers.
     *
     * @remarks
     * Broadcasts {@link @arcadecity/arcade-map/datasource-protocol#ConfigurationMessage}
     * to all [[TileDecoderService]]s running in worker pool.
     *
     * @param options - Options that will be applied to the styles
     * @param customOptions -   new options, undefined options are not changed
     */
    configure(options?: DecoderOptions, customOptions?: OptionsMap): void;
    /**
     * The number of workers started for this decoder. The value is `undefined` until the workers
     * have been created.
     */
    get workerCount(): number | undefined;
}

/**
 * Tiler based on [[ConcurrentWorkerSet]].
 *
 * Tiles payloads using workers running in separate contexts (also known as `WebWorkers`):
 * - connection establishment,
 * - sends tile requests,
 * - configuration.
 */
declare class WorkerBasedTiler implements ITiler {
    private readonly workerSet;
    private readonly tilerServiceType;
    private readonly serviceId;
    private m_serviceCreated;
    /**
     * Creates a new `WorkerBasedTiler`.
     *
     * @param workerSet - [[ConcurrentWorkerSet]] this tiler will live in.
     * @param tilerServiceType - Service type identifier.
     */
    constructor(workerSet: ConcurrentWorkerSet, tilerServiceType: string);
    /**
     * Dispose of dedicated tiler services in workers and remove reference to underlying
     * [[ConcurrentWorkerSet]].
     */
    dispose(): void;
    /**
     * Connects to [[WorkerServiceManager]]s in underlying [[ConcurrentWorkerSet]] and creates
     * dedicated [[TilerService]]s in all workers to serve tiling requests.
     */
    connect(): Promise<void>;
    /**
     * Register index in the tiler. Indexes registered in the tiler can be later used to retrieved
     * tiled payloads using `getTile`.
     *
     * @param indexId - Index identifier.
     * @param input - Url to the index payload, or direct GeoJSON.
     */
    registerIndex(indexId: string, input: URL | GeoJson): Promise<void>;
    /**
     * Update index in the tiler. Indexes registered in the tiler can be later used to retrieved
     * tiled payloads using `getTile`.
     *
     * @param indexId - Index identifier.
     * @param input - Url to the index payload, or direct GeoJSON.
     */
    updateIndex(indexId: string, input: URL | GeoJson): Promise<void>;
    /**
     * Retrieves a tile for a previously registered index.
     *
     * @param indexId - Index identifier.
     * @param tileKey - The {@link @arcadecity/arcade-map/geoutils#TileKey} that identifies the tile.
     */
    getTile(indexId: string, tileKey: TileKey): Promise<{}>;
}

/**
 * Set of `Worker` loading and initialization helpers:
 *  - starting Worker from URL with fallback to XHR+blob {@link WorkerLoader.startWorker}
 *  - waiting for proper worker initialization, see {@link WorkerLoader.waitWorkerInitialized}
 */
declare class WorkerLoader {
    static directlyFallbackToBlobBasedLoading: boolean;
    static sourceLoaderCache: Map<string, Promise<string>>;
    static dependencyUrlMapping: {
        [name: string]: string;
    };
    /**
     * Starts worker by first attempting load from `scriptUrl` using native `Worker` constructor.
     * Then waits (using [[waitWorkerInitialized]]) for first message that indicates successful
     * initialization.
     * If `scriptUrl`'s origin is different than `baseUrl`, then in case of error falls back to
     * [[startWorkerBlob]].
     *
     * We must resolve/reject promise at some time, so it is expected that any sane application will
     * be able to load worker code in some amount of time.
     * By default, this method timeouts after 10 seconds (configurable using `timeout` argument).
     *
     * This method is needed as browsers in general forbid to load worker if it's not on 'same
     * origin' regardless of Content-Security-Policy.
     *
     * For blob-based fallback work, one need to ensure that Content Security Policy (CSP) allows
     * loading web worker code from `Blob`s. By default browsers, allow 'blob:' for workers, but
     * this may change.
     *
     * Following snippet setups CSP, so workers can be started from blob urls:
     *
     *     <head>
     *         <meta http-equiv="Content-Security-Policy" content="child-src blob:">
     *     </head>
     *
     * Tested on:
     *   * Chrome 67 / Linux, Window, OSX, Android
     *   * Firefox 60 / Linux, Windows, OSX
     *   * Edge 41 / Windows
     *   * Safari 11 / OSX
     *   * Samsung Internet 7.2
     *
     * See
     *  * https://benohead.com/cross-domain-cross-browser-web-workers/
     *  * MapBox
     *    * https://stackoverflow.com/questions/21913673/execute-web-worker-from-different-origin
     *    * https://github.com/mapbox/mapbox-gl-js/issues/2658
     *    * https://github.com/mapbox/mapbox-gl-js/issues/559
     *    * https://github.com/mapbox/mapbox-gl-js/issues/6058
     *
     * Findings:
     *
     * * Chrome reports CSP by exception when constructing [[Worker]] instance.
     * * Firefox reports CSP errors when loading in first event:
     *   https://bugzilla.mozilla.org/show_bug.cgi?id=1241888
     * * Firefox 62, Chrome 67 obeys `<meta http-equiv="Content-Security-Policy">` with
     *   `worker-src blob:` but doesn't obey `worker-src URL` when used
     * * Chrome 67 doesn't obey CSP `worker-src URL` despite it's documented as supported
     *   (https://developer.mozilla.org/docs/Web/HTTP/Headers/Content-Security-Policy/worker-src)
     *
     * @param scriptUrl - web worker script URL
     * @param timeout - timeout in milliseconds, in which worker should set initial message
     *    (default 10 seconds)
     */
    static startWorker(scriptUrl: string, timeout?: number): Promise<Worker>;
    /**
     * Start worker, loading it immediately from `scriptUrl`. Waits (using
     * [[waitWorkerInitialized]]) for successful worker start.
     *
     * @param scriptUrl - web worker script URL
     */
    static startWorkerImmediately(scriptUrl: string, timeout: number): Promise<Worker>;
    /**
     * Start worker "via blob" by first loading worker script code with [[fetch]], creating `Blob`
     * and attempting to start worker from blob url. Waits (using [[waitWorkerInitialized]]) for
     * successful worker start.
     *
     * @param scriptUrl - web worker script URL
     */
    static startWorkerBlob(scriptUrl: string, timeout: number): Promise<Worker>;
    /**
     * Fetch script source as `Blob` url.
     *
     * Reuses results, if there are many simultaneous requests.
     *
     * @param scriptUrl - web worker script URL
     * @return promise that resolves to url of a `Blob` with script source code
     */
    static fetchScriptSourceToBlobUrl(scriptUrl: string): Promise<string>;
    /**
     * Waits for successful Web Worker start.
     *
     * Expects that worker script sends initial message.
     *
     * If first event is `message` then assumes that worker has been loaded sussesfully and promise
     * resolves to `worker` object passed as argument.
     *
     * If first event is 'error', then it is assumed that worker failed to load and promise is
     * rejected.
     *
     * (NOTE: The initial 'message' - if received - is immediately replayed using worker's
     * `dispatchEvent`, so application code can also consume it as confirmation of successful
     * worker initialization.
     *
     * We must resolve/reject promise at some time, so it is expected that any sane application will
     * be able to load worker code in some amount of time.
     *
     * @param worker - [[Worker]] instance to be checked
     * @param timeout - timeout in milliseconds, in which worker should set initial message
     * @returns `Promise` that resolves to `worker` on success
     */
    static waitWorkerInitialized(worker: Worker, timeout: number): Promise<Worker>;
}

export { AnimatedExtrusionHandler, AnimatedExtrusionState, ArcadeMap, AreaCopyrightInfo, AtmosphereLightMode, BASE_TECHNIQUE_NON_MATERIAL_PROPS, BaseTileLoader, BoundsGenerator, BufferedGeometryAccessor, BufferedGeometryAccessorBase, BufferedGeometryLineAccessor, BufferedGeometryObject3dAccessor, CalculationStatus, CameraMovementDetector, CameraUtils, Circles, ClipPlanesEvaluator, ColorCache, ConcurrentDecoderFacade, ConcurrentTilerFacade, CopyrightCoverageProvider, CopyrightCoverageResponse, CopyrightElementHandler, CopyrightInfo, CopyrightProvider, DEFAULT_FONT_CATALOG_NAME, DEFAULT_FOV_CALCULATION, DEFAULT_MAX_THEME_INTHERITANCE_DEPTH, DEFAULT_TEXT_DISTANCE_SCALE, DEPTH_PRE_PASS_STENCIL_MASK, DataSource, DataSourceOptions, DataSourceTileList, DebugContext, DepthPrePassProperties, DisplacementMap, ElevationBasedClipPlanesEvaluator, ElevationProvider, ElevationRange, ElevationRangeSource, EventDispatcher, FadingParameters, FixedClipPlanesEvaluator, FovCalculation, FrameStats, FrameStatsArray, IGeometryAccessor, ILineAccessor, IMapAntialiasSettings, IMapRenderingManager, IObject3dAccessor, IPass, IPassManager, ITileDataVisitor, ITileLoader, ImageCache, ImageItem, IndexedBufferedGeometryAccessor, IndexedBufferedGeometryLineAccessor, LoadingState, LookAtParams, MAX_FOV_DEG, MAX_FOV_RAD, MIN_FOV_DEG, MIN_FOV_RAD, MSAARenderPass, MSAASampling, MapAnchor, MapAnchors, MapRenderingManager, MapView, MapViewAtmosphere, MapViewEventNames, MapViewFog, MapViewImageCache, MapViewOptions, MapViewPoints, MapViewUtils, MaterialConstructor, MaterialOptions, MultiStageTimer, Pass, PerformanceStatistics, PickHandler, PickObjectType, PickResult, PoiInfo, PoiManager, PoiTable, PoiTableManager, PolarTileDataSource, PolarTileDataSourceOptions, PolygonFadingParameters, RenderEvent, RequestHeaders, ResourceComputationType, RingBuffer, SampledTimer, SimpleFrameStatistics, SimpleTimer, Squares, Statistics, Stats, TextCanvases, TextElement, TextElementIndex, TextElementStyle, TextElementType, TextElementsRenderer, TextPickResult, TextStyleCache, TextureLoader, TexturizableImage, ThemeLoadOptions, ThemeLoader, Tile, TileDataAccessor, TileDataAccessorOptions, TileDisplacementMap, TileFeatureData, TileGeometryCreator, TileLoaderState, TileObject, TileOffsetUtils, TileResourceInfo, TileResourceUsage, TileTaskGroups, TiltViewClipPlanesEvaluator, Timer, TopViewClipPlanesEvaluator, UrlCopyrightProvider, VisibleTileSet, VisibleTileSetOptions, WorkerBasedDecoder, WorkerBasedTiler, WorkerLoader, applyBaseColorToMaterial, applySecondaryColorToMaterial, buildMetricValueEvaluator, buildObject, computeArrayAverage, computeArrayStats, createDefaultClipPlanesEvaluator, createDepthPrePassMaterial, createDepthPrePassMesh, createMaterial, debugContext, evaluateBaseColorProperty, evaluateColorProperty, getBufferAttribute, getFeatureDataSize, getMaterialConstructor, isDepthPrePassMesh, isLineAccessor, isObject3dAccessor, isRenderDepthPrePassEnabled, poiIsRenderable, setDepthPrePassStencil, usesObject3D };
