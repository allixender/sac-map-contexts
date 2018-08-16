var geoserverURL_local = 'https://portal.smart-project.info/geoserver/wms';
var linzwms_URL_new = 'https://data.linz.govt.nz/services;key=a8fb9bcd52684b7abe14dd4664ce9df9/wms';
var lriswms_URL_new = 'https://lris.scinfo.org.nz/services;key=7c49be26da404042b2d0736595e64952/wms';

var gnsqmapwms_URL = 'https://maps.gns.cri.nz/geology/wms';

var earth2observe_URL = 'https://wci.earth2observe.eu/thredds/wms/deltares/aet-pet/MOD16_PET_corr_monthly_2000_2013.nc';
var earth2observe_URL2 = 'https://wci.earth2observe.eu/thredds/wms/deltares/aet-pet/MOD16_AET_corr_monthly_2000_2013.nc';

var namespace_local = 'horowhenua_ws'; //geoserver workspace

OpenLayers.ProxyHost = '/smart/proxy?url=';


var imageFolder = '/fs/images';

var markerSize = new OpenLayers.Size(21,25);
var markerOffset = new OpenLayers.Pixel(-(markerSize.w/2), -markerSize.h);
//feature info icon
var markerIcon = new OpenLayers.Icon('https://openlayers.org/api/2.13.1/img/marker.png', markerSize, markerOffset);
//address search icon
var googleIcon = new OpenLayers.Icon(imageFolder + '/fahne.gif');

var mercator = new OpenLayers.Projection('EPSG:3857');
var geographic = new OpenLayers.Projection('EPSG:4326');
var projWGS = new Proj4js.Proj('EPSG:4326');
var nzmapgrid = new OpenLayers.Projection('EPSG:27200');
var projNZ = new Proj4js.Proj('EPSG:27200');

var currentContext = "sac";
var mapContextSpecs = [

       {id: "nz",          name: "New Zealand",     parent: null, bounds: [168, -33, 182, -45], image: imageFolder + '/nz_m.png' },
       {id: "nz_overview", name: "Overview",        parent: "nz"},
       {id: "nz_other",    name: "Other Databases", parent: "nz"},

       {id: "ho",           name: "Horowhenua",          parent: null, bounds: [175, -40.8, 175.5, -40.4], image: imageFolder + '/horizons_m.png'},
       {id: "ho_base_info", name: "Base info",           parent: "ho"},
       {id: "ho_hydro",     name: "Hydrology",           parent: "ho"},
       {id: "ho_geology",   name: "Geology and Landuse", parent: "ho"},

       {id: "ng",          name: "Ngongotha DTS",   parent: null, bounds: [176.1, -38.1, 176.2, -38.11], image: imageFolder + '/DTS_banner.png'},
       {id: "ng_dts_exp",  name: "DTS Experiment (Ngongotaha Valley)", parent: "ng"},

       {id: "sac",           name: "SMART Case Studies",          parent: null, bounds: [164, -31, 182, -50], image: imageFolder + '/nz_m.png' },
       {id: "sac_add",    name: "Informative Layers", parent: "sac"},
       {id: "sac_geophys",  name: "Sel. Geophysics", parent: "sac"},
       {id: "sac_dts",  name: "GW-SW Interaction, FODTS", parent: "sac"},
       {id: "sac_tracers",  name: "Novel Tracers", parent: "sac"},
       {id: "sac_datavis",  name: "DataVis and SOS", parent: "sac"}

];

var overlaySpecs = [

    {id: '1', catalog_uid: "", title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50765', children: "nz_other", visible: false, opacity: .90},
    {id: '1', catalog_uid: "", title: 'Linz NZ Mainland Topo50',         geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50767', children: "nz_other", visible: false, opacity: .90},
    {id: '1', catalog_uid: "", title: 'NZ GNS QMAP',                     geoserverURL: gnsqmapwms_URL,           workspace: 'gns',           name: 'NZL_GNS_1M_Lithostratigraphy', children: "nz_other", visible: false, opacity: .80},
    {id: '1', catalog_uid: "", title: 'NZ DTM 100x100',       			 geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'nz-dtm-100x100', children: "nz_other", visible: false, opacity: .80},
    {id: '1', catalog_uid: "", title: 'Equilibrium Water Table',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'ewt_nzprj_new', children: "nz_geophys", visible: false, opacity: .60},
    {id: '1', catalog_uid: "", title: 'Monthly Potential Evapotranspiration (PET)',         	 geoserverURL: earth2observe_URL,        workspace: '', 		 name: 'PET', children: "nz_geophys", visible: false, opacity: .80},
    {id: '1', catalog_uid: "", title: 'PET Uncertainty',         	 geoserverURL: earth2observe_URL,        workspace: '', 		 name: 'Uncertainty', children: "nz_geophys", visible: false, opacity: .80},
    {id: '1', catalog_uid: "", title: 'NZ Aquifers (White 2001)',        geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'nz_aquifers', children: "nz_other", visible: false, opacity: .50},
    {id: '1', catalog_uid: "", title: 'New Zealand regions',             geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'nz_regions', children: "nz_other", visible: true, opacity: .60},
    {id: '1', catalog_uid: "", title: 'DTS Cable Position(Ngongotaha Valley)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'DTS_Cable_Position', children: "nz_other", visible: false, opacity: 1},
    {id: '1', catalog_uid: "", title: 'Matata geological model',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'matata_model', children: "nz_overview", visible: false, opacity: .50},
    {id: '1', catalog_uid: "", title: 'Tauranga geological model',       geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'tauranga_model', children: "nz_overview", visible: false, opacity: .50},
    {id: '1', catalog_uid: "", title: 'Rotorua geological model',        geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'rotorua_model', children: "nz_overview", visible: false, opacity: .50},
    {id: '1', catalog_uid: "", title: 'Rangitaiki geological model',     geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'rangitaiki_model', children: "nz_overview", visible: false, opacity: .50},
    {id: '1', catalog_uid: "", title: 'Horowhenua Area',                 geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'study_area', children: "nz_overview", visible: false, opacity: .70},
    {id: '1', catalog_uid: "", title: 'NGMP Sites',            geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'ngmp-locations', children: "nz_overview", visible: true, opacity: 1.00},

    {id: '2', title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50765', children: "ho_geology", visible: false, opacity: .90},
    {id: '2', title: 'Linz NZ Mainland Topo50',         geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50767', children: "ho_geology", visible: false, opacity: .90},
    {id: '2', title: 'NZ DTM 100x100',       			geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "ho_geology", visible: false, opacity: .80},
    {id: '2', title: 'NZ GNS QMAP',                     geoserverURL: gnsqmapwms_URL,     workspace: 'gns',           name: 'NZL_GNS_1M_Lithostratigraphy', children: "ho_geology", visible: false, opacity: .80},
    {id: '2', title: 'Equilibrium Water Table',         geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ewt_nzprj_new', children: "ho_hydro", visible: false, opacity: .60},
    {id: '2', title: 'Holocene_top_100',       		geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Holocene_top_100_horo', children: "ho_geology", visible: false, opacity: .50},
    {id: '2', title: 'Q2Q3Q4_top_100',       		geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Q2Q3Q4_top_100_horo', children: "ho_geology", visible: false, opacity: .50},
    {id: '2', title: 'Q5_top_100',       			geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Q5_top_100_horo', children: "ho_geology", visible: false, opacity: .50},
    {id: '2', title: 'Q6_top_100',       			geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Q6_top_100_horo', children: "ho_geology", visible: false, opacity: .50},
    {id: '2', title: 'Greywacke_top_100',       	geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Greywacke_top_100_horo', children: "ho_geology", visible: false, opacity: .50},
    {id: '2', title: 'Study Area',                      geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'study_area', children: "ho_base_info", visible: true, opacity: .70},
    {id: '2', title: 'Soil Groups',                     geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'howrowhenua_9soils', children: "ho_geology", visible: false, opacity: .70},
    {id: '2', title: 'Landuse',                         geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'horowhenua_landuse', children: "ho_geology", visible: false, opacity: .70},
    {id: '2', title: 'QMAP Clip',                       geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'qmap_clip', children: "ho_geology", visible: false, opacity: .70},
    {id: '2', title: 'Groundwater Catchments',          geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'catchments', children: "ho_base_info", visible: true, opacity: .80},
    {id: '2', title: 'Lakes',                           geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'lakes', children: "ho_base_info", visible: true, opacity: 1.00},
    {id: '2', title: 'Rivers/Streams',                  geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rivers', children: "ho_base_info", visible: false, opacity: 1.00},

    {id: '2', title: 'gaining/loosing, sel. rivers',          geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'river_gaining_loosing', children: "ho_hydro", visible: false, opacity: 1.00},
    {id: '2', title: 'Mean rainfall contours',                geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'horowhenua_mean_rainfall_contours', children: "ho_hydro", visible: false, opacity: .80},
    {id: '2', title: 'Evaporation contours',                  geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'evaporation_contours', children: "ho_hydro", visible: false, opacity: .80},
    {id: '2', title: 'GW level contours',                     geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'groundwater_level_contours', children: "ho_hydro", visible: false, opacity: 1.00},
    {id: '2', title: 'Springs',                               geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Horowhenua_springs', children: "ho_base_info", visible: false, opacity: 1.00},
    {id: '2', title: 'general Wells',                         geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'wells', children: "ho_base_info", visible: false, opacity: 1.00},
    {id: '2', title: 'Surface water measurements',            geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'surface_waterpoints', children: "ho_hydro", visible: false, opacity: 1.00},
    {id: '2', title: 'Waikawa Lakes subdivision piezometers', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'waikawa_subdivision_piezometers', children: "ho_hydro", visible: false, opacity: 1.00},
    {id: '2', title: 'Groundwater level measurements',        geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'groundwater_level_measurements', children: "ho_hydro", visible: false, opacity: 1.00},
    {id: '2', title: 'SoE gwl monitoring wells',              geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'soe_gwl_monitoring_wells', children: "ho_hydro", visible: true, opacity: 1.00},

    {id: '3', title: 'Linz NZ Terrain Relief (Topo50)',       geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50765', children: "ng_dts_exp", visible: false, opacity: .90},
    {id: '3', title: 'Linz NZ Mainland Topo50',               geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50767', children: "ng_dts_exp", visible: false, opacity: .90},
    {id: '3', title: 'NZ DTM 100x100',       				  geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "ng_dts_exp", visible: false, opacity: .80},
    {id: '3', title: 'Equilibrium Water Table',               geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ewt_nzprj_new', children: "ng_dts_exp", visible: false, opacity: .60},
    {id: '3', title: 'NZ Aquifers (White 2001)',              geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_aquifers', children: "ng_dts_exp", visible: false, opacity: .50},
    {id: '3', title: 'DTS Cable Position(Ngongotaha Valley)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'DTS_Cable_Position', children: "ng_dts_exp", visible: true, opacity: 1.00},
    {id: '3', title: 'Rotorua geological model',              geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rotorua_model', children: "ng_dts_exp", visible: true, opacity: .20},

    //  {id: "sac_add",    name: "Informative Layers", parent: "sac"}workspace: namespace_local, name: 'nz_aquifers', children: "sac_add", visible: false, opacity: .50},
    {id: '4', catalog_uid: "", title: 'NZ DTM 100x100',       				  geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "sac_add", visible: false, opacity: .70},
    {id: '4', catalog_uid: "", title: 'NZ GNS QMAP',                     geoserverURL: gnsqmapwms_URL,           workspace: 'gns',           name: 'NZL_GNS_1M_Lithostratigraphy', children: "sac_add", visible: false, opacity: .80},
    {id: '4', catalog_uid: "", title: 'NZ Aquifers (White 2001)',              geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_aquifers', children: "sac_add", visible: false, opacity: .50},
    {id: '4', catalog_uid: "", title: 'New Zealand regions',             geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'nz_regions', children: "sac_add", visible: false, opacity: .70},
    {id: '4', catalog_uid: "", title: 'NGMP Sites',            geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'ngmp-locations', children: "sac_add", visible: false, opacity: 1.00},

    //  {id: "sac_geophys",  name: "Sel. Geophysics", parent: "sac"},
    {id: '4', catalog_uid: "", title: 'Equilibrium Water Table (NZ)',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'ewt_nzprj_new', children: "sac_geophys", visible: false, opacity: .60},
    {id: '4', catalog_uid: "", title: 'Monthly Potential Evapotranspiration (PET NZ)',         	 geoserverURL: earth2observe_URL,        workspace: '', 		 name: 'PET', children: "sac_geophys", visible: false, opacity: .60},
    {id: '4', catalog_uid: "", title: 'PET Uncertainty (NZ)',         	 geoserverURL: earth2observe_URL,        workspace: '', 		 name: 'Uncertainty', children: "sac_geophys", visible: false, opacity: .70},
    {id: '4', catalog_uid: "", title: 'Monthly Actual Evapotranspiration (AET NZ)',         	 geoserverURL: earth2observe_URL2,        workspace: '', 		 name: 'AET', children: "sac_geophys", visible: false, opacity: .60},
    // {id: '4', catalog_uid: "", title: 'recharge',         	 geoserverURL: "http://localhost:8080/ncWMS/wms",        workspace: '', 		 name: 'NZ_recharge_monthly_2000_2013/recharge', children: "sac_geophys", visible: false, opacity: .60},
    {id: '4', catalog_uid: "", title: 'AET Uncertainty (NZ)',         	 geoserverURL: earth2observe_URL2,        workspace: '', 		 name: 'Uncertainty', children: "sac_geophys", visible: false, opacity: .70},
    {id: '4', catalog_uid: "", title: 'Hawkes Bay',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'HawkesBay_geophys', children: "sac_geophys", visible: true, opacity: .80},
    {id: '4', catalog_uid: "", title: 'Canterbury',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'canterbury_region', children: "sac_geophys", visible: true, opacity: .80},
    {id: '4', catalog_uid: "", title: 'Horizons Tararua',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'Horizons_Tararua', children: "sac_geophys", visible: true, opacity: .80},
    {id: '4', catalog_uid: "", title: 'Otago EM',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'OtagoEM', children: "sac_geophys", visible: true, opacity: .80},
    {id: '4', catalog_uid: "", title: 'Waipa Catchment',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'waipa_catchment', children: "sac_geophys", visible: true, opacity: .80},

    //    {id: "sac_dts",  name: "GW-SW Interaction, DTS", parent: "sac"}
    {id: '4', catalog_uid: "", title: 'FODTS Testsites', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'FODTS-Testsites', children: "sac_dts", visible: true, opacity: .80},
    {id: '4', catalog_uid: "", title: 'TempSensing Testsites Extended', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'TemperatureSensingLocations', children: "sac_dts", visible: true, opacity: .80},

    //  {id: "sac_tracers",  name: "Novel Tracers", parent: "sac"},
    {id: '4', catalog_uid: "", title: 'Halon-1301 Sampling Sites',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'hutt_halon_sites', children: "sac_tracers", visible: true, opacity: .80},

    //  {id: "sac_datavis",  name: "DataVis and SOS", parent: "sac"},
    {id: '4', catalog_uid: "", title: 'Horowhenua Area (3D)',     geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'study_area', children: "sac_datavis", visible: true, opacity: .80},
    {id: '4', catalog_uid: "", title: 'Upper Rangitaiki SOS Site',         geoserverURL: geoserverURL_local,       workspace: namespace_local, name: 'rangitaikisossite', children: "sac_datavis", visible: true, opacity: .80}

];

/* holds the base layers */
/* TODO put into real datamodel */
var arrayEsri1 = ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/${z}/${y}/${x}.jpg"];
var arrayEsri2 = ["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/${z}/${y}/${x}.jpg"];

var baseLayerSpecs = [
    new OpenLayers.Layer.OSM("&copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community", arrayEsri2),
    new OpenLayers.Layer.OSM("&copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012", arrayEsri1),
    new OpenLayers.Layer.WMS("Linz Topo50", linzwms_URL_new, { layers: 'layer-50767', transparent: false, format: "image/png"}, { isBaseLayer: true, singleTile: false, visibility: true, displayInLayerSwitcher: true, opacity: 1})
  // new OpenLayers.Layer.Google('Google Terrain', {type : google.maps.MapTypeId.TERRAIN, 'sphericalMercator': true}),
  //new OpenLayers.Layer.Google('Google Streets',{'sphericalMercator': true, projection: "EPSG:3857"}),
  //new OpenLayers.Layer.Google('Google Hybrid', {type: google.maps.MapTypeId.HYBRID, sphericalMercator: true, projection: "EPSG:3857"}),
];

var map, markers;

function initMapviewer() {
    //Overriding collision detection default settings of the jQuery dialog.
    //this fixes the positioning problem in FF - gnarf!
    //see http://stackoverflow.com/questions/8198255/jqueryui-dialog-position-not-working
    $.extend($.ui.dialog.prototype.options.position, { collision: 'none' });

    initMap();
    initIntroDialog();
    initMapcontextWindow();
    initLayerWindow();
    initFeatureInfoWindow();

    switchMapcontext(currentContext);
}

/**
 * initialize openlayers map
 */
function initMap() {
    map = new OpenLayers.Map('map', {
        projection: mercator,
        displayProjection: geographic,
        units: 'm',
        tileSize: new OpenLayers.Size(512,512),
        numZoomLevels: 19,
        maxResolution: 156543.0339,
        maxExtend: new OpenLayers.Bounds(-20037508, -20037508, 20037508, 20037508.34),
        controls: [],

    });

    for (i=0; i<baseLayerSpecs.length; i++) {
        map.addLayer(baseLayerSpecs[i]);
    }

    /* TODO do we really need this? It's here entirely for the search box atm. Add a marker, when we found a search! */
    markers = new OpenLayers.Layer.Markers("Markers", {displayInLayerSwitcher: false});
    map.addLayer(markers);

    // TODO nice custom zoom control
    map.addControl(new OpenLayers.Control.ScaleLine());
    map.addControl(new OpenLayers.Control.Navigation());
    map.addControl(new OpenLayers.Control.LoadingPanel({maximized:true}));
    console.log("map " + map.projection);
}

/**
 * Creates the introDialog
 */
function initIntroDialog() {
    $("#introDialog").dialog({
        autoOpen : false,
        show : {
            effect : "fade",
            duration : 400
        },
        hide : {
            effect : "fade",
            duration : 400
        },
        position : {
            my : "center",
            at : "center",
            of : "#map"
        },
        width : 600,
        resizeable: false,
        modal : false
    });
    $("#introDialog").css("visibility", "visible");
}

/**
 * initialize map context switcher
 */
function initMapcontextWindow() {
    $("#mapContextWindow").dialog( {
        autoOpen : false,
        show : {
            effect : "fade",
            duration : 400
        },
        hide : {
            effect : "fade",
            duration : 400
        },
        position : {
            my : "left top",
            at : "left bottom+15px",
            of : "#navbar"
        },
        width : 250,
        height: 95,
        resizeable: false,
        modal : false
    });
    $("#mapContextWindow").css("visibility", "visible");

    $("#mapContextSelect").html("");

    var contexts = mapContextSpecs.filter(function (element) {return element.parent == null});
    for (i=0; i<contexts.length; i++) {
        var sel = "";
        if (contexts[i].id == currentContext) {
            sel = " selected"
        }
        $("#mapContextSelect").append("<option value=\""+contexts[i].id+"\""+ sel +">" + contexts[i].name + "</option>");
    }
}

/**
 * initialize layer window
 * @returns
 */
function initLayerWindow() {
    $("#layerWindow").css("visibility", "visible");
    $("#layerWindow").dialog({
        autoOpen : true,
        show : {
            effect : "fade",
            duration : 400
        },
        hide : {
            effect : "fade",
            duration : 400
        },
        position : {
            my : "right top",
            at : "right bottom+15px",
            of : "#navbar"
        },
        width : 350,
        height: 570,
        resizeable: false,
        modal : false
    });
    $("#layerAccordion").accordion({ heightStyle: "content" });
}

/**
 * initializes the feature info window
 */
function initFeatureInfoWindow() {
    $("#featureInfoWindow").dialog({
        autoOpen : false,
        show : {
            effect : "fade",
            duration : 400
        },
        hide : {
            effect : "fade",
            duration : 400
        },
        position: {
            my: "center top",
            at: "center bottom+15px",
            of: "#navbar"
        },
        beforeClose: function(event, ui) {
            markers.clearMarkers();
        },
        width : 480,
        height: 340,
        modal : true
    });
    $("#featureInfoWindow").css("visibility", "visible");

    /* TODO move to initMap */
    featureInfo = new OpenLayers.Control.WMSGetFeatureInfo({
        id: 'getfeatureinfo',
        queryVisible: true,
        url: geoserverURL_local,
        //layerUrls: [linzwms_URL_new, geoserverURL_local, geoserverURL_test, gnsqmapwms_URL, lriswms_URL_new, earth2observe_URL ],

        /* buffer: clicking tolerance */
        vendorParams: {
            buffer: 5
        },
        eventListeners: {
            getfeatureinfo: showFeatureInfoWindow
        },
        infoFormat: 'text/html'
    });

    map.addControl(featureInfo);
    featureInfo.activate();
    document.getElementById('map').style.cursor = 'pointer';
}

/**
 * adds an overlay WMS layer to the map
 *
 * @param layer
 * @returns
 */
function addLayer(layer, isBaseLayer) {
    var fullname;
    // extern layers without namespace (no GeoServer WMS)
    if (layer.workspace != '') {
        fullname = layer.workspace + ':' + layer.name;
    }
    else {
        fullname = layer.name;
    }
    var layerParams = {
        layers: fullname,
        transparent: true,
        format: "image/png",
    };
    var layerProps = {
        isBaseLayer: false,
        singleTile: false,
        visibility: layer.visible,
        displayInLayerSwitcher: true,
        opacity: layer.opacity,
    };

    osmlayer = new OpenLayers.Layer.WMS(layer.title, layer.geoserverURL, layerParams, layerProps);
    map.addLayer(osmlayer);
    layer.id = osmlayer.id;
}

/**
 * deletes all overlay layers and loads all layers according to the given map context
 */
function loadLayersFromMapContext(mapcontext) {
    var overlays = map.getLayersBy("isBaseLayer", false);
    /* TODO check for filter compability */
    var contextSections = mapContextSpecs.filter(function(element) {return element.parent == currentContext});
    contextSections = contextSections.map(function (element) {return element.id});
    var layersToAdd = overlaySpecs.filter(function (element) {return (contextSections.indexOf(element.children) > -1)});

    /* TODO don't delete marker-layer etc*/
    for (i=0; i<overlays.length; i++) {
        if (overlays[i] !== markers) {
            map.removeLayer(overlays[i]);
        }
    }

    for (i = 0; i < layersToAdd.length; i++) {
        addLayer(layersToAdd[i]);
    }
}

/**
 * Set opacity for a layer from slider
 * @param event
 * @param ui
 */
function setOverlayOpacity(event, ui) {
    /* TODO cuts off magic string constant 'slider_' */
    var layerid = $(ui.handle).parent().attr('id').substring(7);
    if (map.getLayer(layerid) != null) {
        map.getLayer(layerid).setOpacity(ui.value / 100);
    }
}


/**
 * updates the layerlist inside the layerwindow
 * IMPORTANT to make sure to get the correct layer IDs this function is getting the layers directly out
 *           of the map. make sure you added the correct layers PRIOR calling this function!
 */
function updateLayerWindow() {
    /* TODO change to baselayer specs array */
    var baselayers = map.getLayersBy("isBaseLayer", true);

    var html = "";
    /* create accordion sections */
    /* base layers */
    $('#layerAccordion').html("<h3>Base Layers</h3><div id=\"layerAccordionBaseLayers\"></div>");

    /* overlay sections according to current context */
    /* TODO check if filter is present in all browsers - is nonstandard */
    var contextSections = mapContextSpecs.filter(function(element) {return element.parent == currentContext});
    for (i=0; i<contextSections.length; i++) {
        $('#layerAccordion').append("<h3>" + contextSections[i].name + "</h3>" +
                "<div id=\"layerwindow_" + contextSections[i].id + "\"></div>");
    }

    /* add layer controls to sections */
    /* base layers */
    for (i = 0; i < baselayers.length; i++) {
        var s="";
        if (map.baseLayer == baselayers[i]) {s = "checked";}
        html = "<label class=\"radio\">"
               + "<input type=\"radio\" name=\"radiogroup_baselayer\" id=\"radio_"+baselayers[i].id+"\" value=\""
               + baselayers[i].id + "\" " + s+" onclick=\"map.setBaseLayer(map.getLayer(\'"+baselayers[i].id+"\'))\">"
               + baselayers[i].name + "</label>";
        $("#layerAccordionBaseLayers").append(html);
    }

    /* overlay layers according to current context */
    html = "";
    for (i=0; i<contextSections.length; i++) {
        /* TODO check for filter function */
        var layersToAdd = overlaySpecs.filter(function (element) {return element.children == contextSections[i].id});

        for (j = 0; j < layersToAdd.length; j++) {
            var s = "";
            if (map.getLayer(layersToAdd[j].id).visibility) {
                s = " checked";
            }
            html = "<label class=\"checkbox\">" + "<input type=\"checkbox\" id=\"checkbox_" + layersToAdd[j].id + "\" value=\""
                    + layersToAdd[j].id + "\" " +
                    "onclick=\"switchLayerVisibility(\'"+layersToAdd[j].id+"\')\""+s +">" + layersToAdd[j].title +
                    "<div style=\"margin:3px\"><div id=\"slider_"+ layersToAdd[j].id +"\"></div></div>" +
                    "</label>";
            $("#layerwindow_"+contextSections[i].id).append(html);
            /* setup the opacity slider */
            $("#slider_"+layersToAdd[j].id).slider({
                min: 0,
                max: 100,
                step: 10,
                change: this["setOverlayOpacity"] /*TODO figure out how dirty that is - gets function pointer */,
                value: layersToAdd[j].opacity*100 });
        }
    }
    $("#layerAccordion").accordion("refresh");
    $("#layerAccordion").accordion("option", "active", 1);
}

/**
 * updates the legend window. only works for WMS-Layers at the moment
 * TODO überarbeiten!
 */
function updateMapLegend() {
    var htmlText = "";
    $("#maplegend").html("");
    for (layer_idx in map.layers) {
        var layer = map.layers[layer_idx];
        var scale = layer.map.getScale();
        /* create legend only for visible WMS-layers */
        //TODO: get style or sld_body for client side adapted style or sld property
        //TODO: no legend elements if map extent outside of bounding box of layer
        if (layer instanceof OpenLayers.Layer.WMS && layer.visibility) {
            /* WMS-Layer in Openlayers can consist of several comma separated WMS-Layers*/
            var url_layers_string = layer.params.LAYERS;
            var url_layers = url_layers_string.split(',');
            for (part_idx in url_layers) {
                singlelayer = url_layers[part_idx];
                var url = layer.url;
                url += (url.indexOf('?') === -1) ? '?' : '';
                url += '&SERVICE=WMS';
                url += '&VERSION=1.1.1';
                url += '&REQUEST=GetLegendGraphic';
                url += '&FORMAT=image/png';
                url += '&LAYER=' + singlelayer;
                //added for MinScaleDenominator and MaxScaleDenominator
                url += '&SCALE=' + scale;
                //if image unloadable (case of Min- or MaxScaleDenominator in sld file), hide div
                htmlText = '<div title="FARCK" id="legend_'+layer.id+'"><img src="' + url + '" onError="hideLegend(this);" onLoad="createLegendTooltip(event, this)" style="width:20px; height:20px; background: url(\''+imageFolder+'/loading_arrow_20x20.gif\') no-repeat;">&nbsp;<span id="legendtext_'+layer.id+'">'+layer.name+'</span></div>';
                $("#maplegend").append(htmlText);
//                $("#legend_"+layer.id).tooltip();
            }
        }
    }
}

/**
 * creates a legend if the image is too big
 */
function createLegendTooltip(event, source) {
    var parentId = source.parentNode.id;
    var textId = source.parentNode.childNodes[2].id;

    if ( (source.naturalWidth > 20) || (source.naturalHeight > 20)) {
        $("#"+parentId).css("cursor", "help");
        $("#"+textId).css({
            "border-bottom": "1px dashed #EAEAEA",
            "color": "#EAEAEA"
        });

        $("#"+parentId).tooltip({ content: '<img src="' + source.src + '"/>' });
    }

}


/**
 * Switches the map context
 * @param value id of the context
 */
function switchMapcontext(value) {
    currentContext = value;

    loadLayersFromMapContext(currentContext);

    var boundspec = mapContextSpecs.filter(function(element) {return element.id == currentContext})[0].bounds;
    var bounds = new OpenLayers.Bounds(boundspec[0], boundspec[1], boundspec[2], boundspec[3]).transform(geographic, map.getProjectionObject())
    map.zoomToExtent(bounds);

    updateLayerWindow();
    updateMapLegend();
}

function switchLayerVisibility(layerId) {
    map.getLayer(layerId).setVisibility(!map.getLayer(layerId).visibility);
    updateMapLegend();
}

/**
 * Shows the introDialog
 */
function showIntroDialog() {
    $("#introDialog").dialog("open");
}

/**
 * Shows the layer window
*/
function showLayerWindow() {
//    updateLayerWindow();
    $("#layerWindow").dialog("open");
}

/**
 * shows the predefined map contexts window
 */
function showMapcontextWindow() {
    $("#mapContextWindow").dialog("open");
}

/**
 * shows the feature info window
 * this is called from a click event on a map
 */
function showFeatureInfoWindow(event) {
    var htmlText = event.text;

    var lonLat = map.getLonLatFromPixel(event.xy);
    var lonLatWGS = lonLat.clone().transform(map.getProjectionObject(), geographic);
    //checking if body-tag is empty
    //TODO checking for empty body tag sucks. better getting empty document or http error status
    if (!htmlText.match(/<body>\s*<\/body>/)) {
        var point = new Proj4js.Point(lonLatWGS.lon, lonLatWGS.lat);
        Proj4js.transform(projWGS, projNZ, point);

        htmlText = replaceModelPlaceholderWithURL(htmlText, point.x.toFixed(), point.y.toFixed());
        $("#featureInfoContents").html(htmlText);

        //reposition window that you can see the marker and window is inside the map
        var posX = event.xy.x + 10;
        var posY = event.xy.y - 10;

        var width = $("#featureInfoWindow").dialog("option", "width");
        var height = $("#featureInfoWindow").dialog("option", "height");

        // check if windows would be outside of the map - leave space of 10px to the border
        if (posX + width > map.getSize().w + 10) {
            posX = posX - width - 25; //put window left of marker and leave some space
        }
        if (posY + height > map.getSize().h + 10) {
            posY = posY - height - 20; //put window above marker and leave some space
        }

        markers.addMarker(new OpenLayers.Marker(lonLat, markerIcon));
        $("#featureInfoWindow").dialog("option", "position", [posX, posY]);
        $("#featureInfoWindow").dialog("option", "title", "Feature Info at " + Math.round(lonLatWGS.lon*1000)/1000 + " / " + Math.round(lonLatWGS.lat*1000)/1000);
        $("#featureInfoWindow").dialog("open");
    }
    else {
        alert("There's not Feature Information at " + Math.round(lonLatWGS.lon*1000)/1000 + " / " + Math.round(lonLatWGS.lat*1000)/1000);
    }
}
/**
 * action on search form submit
 * @param event
 */
function searchLocation(event) {
    var location = $("#searchfield").val();
    googleGeocoder(location);
}

/**
 * geocodes the adress from the search box and zooms the map to it
 * @param address
 */
function googleGeocoder(address){
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            markers.clearMarkers();
            var point = results[0].geometry.location;
            var lonLat = new OpenLayers.LonLat(point.lng(), point.lat()).transform(geographic, map.getProjectionObject());
            map.setCenter(lonLat, 14);
            markers.addMarker(new OpenLayers.Marker(lonLat, googleIcon));
        }
        else {
            alert("Geocoding error: " + status);
        }
    });
}

/**
 * getWMC() gets the actual map config as WMC document
 */
function getWMC() {

	var parserWMC = new OpenLayers.Format.WMC({'layerOptions': {buffer: 0}});
	document.getElementById("wmc").value = parserWMC.write(map);
	//console.log(document.getElementById("wmc").value);
	return document.getElementById("wmc").value;
}

function open3d() {

	var wmcdata = getWMC();
	console.log("getWMC() done");
	var form = document.getElementById("wmcform");
	form.submit();
//	console.log("form.submit(); done");
//	document.wmcform.submit();
//	console.log("document.wmcform.submit(); done");
//	//$("#wmcform").submit();
//	$( "#wmcform" ).submit(function( event ) {
//		  alert( "Handler for .submit() called." );
//		  event.preventDefault();
//	});
//	console.log("#wmcform submit(); done");
//	alert( "Ready - go :-)" );
//	$.post("/smart/x3d/showScene", getWMC(), function (data, textStatus, jqXHR) {
//		var myWindow = window.open("", "Dreideh", "");
//		myWindow.document.write(data);
//	});
//	$.ajax({
//	    url: "/smart/x3d/showScene",
//	    data: { "wmcdoc" : getWMC()},
//	    type: 'POST',
//	    contentType: "text/xml",
//	    dataType: "xml",
//	    success : function (data, textStatus, jqXHR) {
//			var myWindow = window.open("", "Dreideh", "");
//			myWindow.document.write(data);
//		},
//	    error : function (xhr, ajaxOptions, thrownError){
//	        console.log(xhr.status);
//	        console.log(thrownError);
//	    }
//	});
}
