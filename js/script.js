// Initialize the map
const map = L.map('map').setView([-2.5, 118], 5);

// Add base tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
}).addTo(map);

// Global variable to store GeoJSON layer
let universitiesLayer;

// List of Negeri Universities (case insensitive)
const NEGERI_UNIVERSITIES = {
    "universitas indonesia": true,
    "universitas gadjah mada": true,
    "institut teknologi bandung": true,
    "institut pertanian bogor": true,
    "universitas airlangga": true,
    "universitas padjadjaran": true,
    "universitas diponegoro": true,
    "universitas hasanuddin": true,
    "institut teknologi sepuluh nopember": true,
    "universitas sumatera utara": true,
    "universitas pendidikan indonesia": true,
    "universitas brawijaya": true,
    "universitas sebelas maret": true,
    "universitas negeri jakarta": true,
    "universitas negeri yogyakarta": true,
    "universitas negeri malang": true,
    "universitas negeri semarang": true,
    "universitas negeri surabaya": true,
    "universitas negeri makassar": true,
    "universitas negeri medan": true,
    "universitas negeri padang": true,
    "universitas andalas": true,
    "universitas riau": true,
    "universitas sriwijaya": true,
    "universitas lampung": true,
    "universitas tanjungpura": true,
    "universitas jenderal soedirman": true,
    "universitas syiah kuala": true,
    "universitas tadulako": true,
    "universitas udayana": true,
    "universitas mataram": true,
    "universitas nusa cendana": true,
    "universitas cenderawasih": true,
    "universitas khairun": true,
    "universitas papua": true,
    "universitas mulawarman": true,
    "universitas lambung mangkurat": true,
    "universitas bengkulu": true,
    "universitas terbuka": true,
    "universitas negeri gorontalo": true,
    "universitas malikussaleh": true,
    "universitas jember": true,
    "universitas trunojoyo": true,
    "universitas sultan ageng tirtayasa": true,
    "universitas tidar": true,
    "universitas singaperbangsa karawang": true,
    "universitas siliwangi": true,
    "universitas borneo tarakan": true,
    "universitas palangka raya": true,
    "universitas sam ratulangi": true,
    "universitas sulawesi barat": true,
    "politeknik negeri jakarta": true,
    "politeknik negeri bandung": true,
    "politeknik negeri semarang": true,
    "politeknik negeri malang": true,
    "politeknik negeri medan": true,
    "politeknik negeri padang": true,
    "politeknik negeri lampung": true,
    "politeknik negeri pontianak": true,
    "politeknik negeri samarinda": true,
    "politeknik negeri ujung pandang": true,
    "politeknik negeri bali": true,
    "politeknik negeri ambon": true,
    "politeknik negeri manado": true,
    "politeknik negeri kupang": true,
    "politeknik negeri lhokseumawe": true,
    "politeknik negeri jember": true,
    "institut seni indonesia yogyakarta": true,
    "institut seni indonesia surakarta": true,
    "institut seni indonesia denpasar": true,
    "institut seni indonesia padang panjang": true,
    "institut teknologi sumatera": true,
    "uin syarif hidayatullah": true,
    "uin sunan kalijaga": true,
    "uin alauddin": true,
    "uin sunan ampel": true,
    "uin walisongo": true,
    "uin raden fatah": true,
    "uin sultan syarif kasim": true,
    "uin ar-raniry": true,
    "uin sunan gunung djati": true,
    "uin maulana malik ibrahim": true
};

// Function to check if a university is Negeri
function isNegeri(name) {
    if (!name) return false;
    const lowerName = name.toLowerCase();
    return NEGERI_UNIVERSITIES.hasOwnProperty(lowerName);
}

// Function to style the GeoJSON features
function getStyle(feature) {
    const isNegeriUniv = isNegeri(feature.properties.name);
    
    // Style for polygons (university areas)
    if (feature.geometry.type === 'MultiPolygon' || feature.geometry.type === 'Polygon') {
        return {
            fillColor: isNegeriUniv ? '#2980b9' : '#e74c3c',
            color: isNegeriUniv ? '#1a5276' : '#c0392b',
            weight: 2,
            opacity: 1,
            fillOpacity: 0.5
        };
    } 
    // Style for point features (university markers)
    else {
        return {
            radius: 8,
            fillColor: isNegeriUniv ? '#2980b9' : '#e74c3c',
            color: '#fff',
            weight: 1,
            opacity: 1,
            fillOpacity: 0.8
        };
    }
}

// Function to create popups for each feature
function onEachFeature(feature, layer) {
    const properties = feature.properties;
    const name = properties.name || "Universitas Tanpa Nama";
    const isNegeriUniv = isNegeri(name);
    const status = isNegeriUniv ? 'negeri' : 'swasta';
    
    // Create popup content
    const popupContent = `
        <div class="university-popup">
            <div class="name">${name}</div>
            <div class="status" data-status="${status}">${isNegeriUniv ? 'Negeri' : 'Swasta'}</div>
            ${properties['addr:full'] ? `<div class="info"><strong>Alamat:</strong> ${properties['addr:full']}</div>` : ''}
            ${properties.website ? `<div class="info"><strong>Website:</strong> <a href="${properties.website}" target="_blank">${properties.website}</a></div>` : ''}
            ${properties['@id'] ? `<div class="info"><strong>OSM ID:</strong> ${properties['@id']}</div>` : ''}
        </div>
    `;
    
    layer.bindPopup(popupContent);
    
    // Show info in sidebar when clicked
    layer.on('click', function() {
        document.getElementById('info-content').innerHTML = `
            <h3>${name}</h3>
            <p><strong>Status:</strong> <span class="status-badge" data-status="${status}">${isNegeriUniv ? 'Negeri' : 'Swasta'}</span></p>
            ${properties['addr:full'] ? `<p><strong>Alamat:</strong> ${properties['addr:full']}</p>` : ''}
            ${properties.website ? `<p><strong>Website:</strong> <a href="${properties.website}" target="_blank">${properties.website}</a></p>` : ''}
            ${properties.phone ? `<p><strong>Telepon:</strong> ${properties.phone}</p>` : ''}
            ${properties.email ? `<p><strong>Email:</strong> ${properties.email}</p>` : ''}
            ${properties['@id'] ? `<p><strong>OSM ID:</strong> ${properties['@id']}</p>` : ''}
        `;
    });
}

// Function to load GeoJSON data
function loadGeoJSONData() {
    fetch('data/datauniversity.geojson')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // Add GeoJSON layer to map
            universitiesLayer = L.geoJSON(data, {
                style: getStyle,
                pointToLayer: function(feature, latlng) {
                    return L.circleMarker(latlng, getStyle(feature));
                },
                onEachFeature: onEachFeature
            }).addTo(map);
            
            // Fit map to show all universities
            if (universitiesLayer.getBounds().isValid()) {
                map.fitBounds(universitiesLayer.getBounds());
            }
        })
        .catch(error => {
            console.error('Error loading GeoJSON:', error);
            document.getElementById('info-content').innerHTML = 
                '<p class="error">Gagal memuat data universitas. Pastikan file datauniversity.geojson tersedia.</p>';
        });
}

// Filter universities by status
function filterUniversities(status) {
    if (!universitiesLayer) return;
    
    // Update active button
    document.querySelectorAll('.filters button').forEach(btn => {
        btn.classList.remove('active');
    });
    document.getElementById(`filter-${status}`).classList.add('active');
    
    universitiesLayer.eachLayer(function(layer) {
        const name = layer.feature.properties.name || "";
        const isNegeriUniv = isNegeri(name);
        
        if (status === 'all' || 
            (status === 'negeri' && isNegeriUniv) || 
            (status === 'swasta' && !isNegeriUniv)) {
            if (!map.hasLayer(layer)) {
                layer.addTo(map);
            }
        } else {
            if (map.hasLayer(layer)) {
                map.removeLayer(layer);
            }
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    loadGeoJSONData();
    
    // Setup filter buttons
    document.getElementById('filter-all').addEventListener('click', () => filterUniversities('all'));
    document.getElementById('filter-negeri').addEventListener('click', () => filterUniversities('negeri'));
    document.getElementById('filter-swasta').addEventListener('click', () => filterUniversities('swasta'));
});