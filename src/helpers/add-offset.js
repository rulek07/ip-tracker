export function addOffset(map) {
    // Calculate the offset
    var offset = map.getSize().y*0.15;
    // Then move the map
    map.panBy(new L.Point(0, -offset), {animate: false});
}