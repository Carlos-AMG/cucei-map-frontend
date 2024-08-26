export function calculateCentroid(coordinates) {
    let lngSum = 0;
    let latSum = 0;
    let numPoints = coordinates[0].length;

    coordinates[0].forEach(point => {
        lngSum += point[0]; // Longitude (x-coordinate)
        latSum += point[1]; // Latitude (y-coordinate)
    });

    return [latSum / numPoints, lngSum / numPoints];
}
