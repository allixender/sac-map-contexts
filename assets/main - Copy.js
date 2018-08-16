"use strict";
exports.__esModule = true;
var geoserverURL_local = 'https://portal.smart-project.info/geoserver/wms';
var linzwms_URL_new = 'https://data.linz.govt.nz/services;key=a8fb9bcd52684b7abe14dd4664ce9df9/wms';
var lriswms_URL_new = 'https://lris.scinfo.org.nz/services;key=7c49be26da404042b2d0736595e64952/wms';
var gnsqmapwms_URL = 'https://maps.gns.cri.nz/geology/wms';
var earth2observe_URL = 'https://wci.earth2observe.eu/thredds/wms/deltares/aet-pet/MOD16_PET_corr_monthly_2000_2013.nc';
var earth2observe_URL2 = 'https://wci.earth2observe.eu/thredds/wms/deltares/aet-pet/MOD16_AET_corr_monthly_2000_2013.nc';
var geoserverURL_awahou = 'https://portal.smart-project.info/geoserver/wms';
var namespace_local = 'horowhenua_ws'; //geoserver workspace
var namespace_awahou = 'horowhenua_ws'; //geoserver workspace
var imageFolder = 'https://portal.smart-project.info/fs/images';
//feature info icon
var markerIcon = 'https://openlayers.org/api/2.13.1/img/marker.png';
//address search icon
var googleIcon = imageFolder + '/fahne.gif';
var mercator = 'EPSG:3857';
var geographic = 'EPSG:4326';
var projWGS = 'EPSG:4326';
var nzmapgrid = 'EPSG:27200';
var projNZ = 'EPSG:27200';
var mapContextSpecs = [
    { id: "nz", name: "New Zealand", parent: null, bounds: [164, -48, 180, -33], image: imageFolder + '/nz_m.png' },
    { id: "nz_overview", name: "Overview", parent: "nz" },
    { id: "nz_other", name: "Other Databases", parent: "nz" },
    { id: "ho", name: "Horowhenua", parent: null, bounds: [175, -40.8, 175.5, -40.4], image: imageFolder + '/horizons_m.png' },
    { id: "ho_base_info", name: "Base info", parent: "ho" },
    { id: "ho_hydro", name: "Hydrology", parent: "ho" },
    { id: "ho_geology", name: "Geology and Landuse", parent: "ho" },
    { id: "ng", name: "Ngongotha DTS", parent: null, bounds: [176.1, -38.1, 176.2, -38.15], image: imageFolder + '/DTS_banner.png' },
    { id: "ng_dts_exp", name: "DTS Experiment (Ngongotaha Valley)", parent: "ng" },
    { id: "sac", name: "SMART Case Studies", parent: null, bounds: [164, -31, 182, -50], image: imageFolder + '/nz_m.png' },
    { id: "sac_add", name: "Informative Layers", parent: "sac" },
    { id: "sac_geophys", name: "Sel. Geophysics", parent: "sac" },
    { id: "sac_dts", name: "GW-SW Interaction, FODTS", parent: "sac" },
    { id: "sac_tracers", name: "Novel Tracers", parent: "sac" },
    { id: "sac_datavis", name: "DataVis and SOS", parent: "sac" },
    { id: "awa", name: "Awahou Catchment", parent: null, bounds: [176.1, -38.11, 176.3, -37.97], image: imageFolder + '/nz_m.png' },
    { id: "awa_catch", name: "Awahou Catchment", parent: "awa" },
    { id: "awa_add", name: "Informative Layers", parent: "awa" }
];
var overlaySpecs = [
    //{id: '1', catalog_uid: "", title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL,              workspace: 'x765',          name: 'x765', children: "nz_other", visible: false, opacity: .90},
    //{id: '1', catalog_uid: "", title: 'Linz NZ Mainland Topo50',         geoserverURL: linzwms_URL,              workspace: 'x767',          name: 'x767', children: "nz_other", visible: false, opacity: .90},
    { id: '1', catalog_uid: "", title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50765', children: "nz_other", visible: false, opacity: .90 },
    { id: '1', catalog_uid: "", title: 'Linz NZ Mainland Topo50', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50767', children: "nz_other", visible: false, opacity: .90 },
    { id: '1', catalog_uid: "", title: 'NZ GNS QMAP', geoserverURL: gnsqmapwms_URL, workspace: 'gns', name: 'NZL_GNS_1M_Lithostratigraphy', children: "nz_other", visible: false, opacity: .80 },
    { id: '1', catalog_uid: "", title: 'NZ DTM 100x100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "nz_other", visible: false, opacity: .80 },
    { id: '1', catalog_uid: "", title: 'Equilibrium Water Table', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ewt_nzprj_new', children: "nz_geophys", visible: false, opacity: .60 },
    { id: '1', catalog_uid: "", title: 'Monthly Potential Evapotranspiration (PET)', geoserverURL: earth2observe_URL, workspace: '', name: 'PET', children: "nz_geophys", visible: false, opacity: .80 },
    { id: '1', catalog_uid: "", title: 'PET Uncertainty', geoserverURL: earth2observe_URL, workspace: '', name: 'Uncertainty', children: "nz_geophys", visible: false, opacity: .80 },
    { id: '1', catalog_uid: "", title: 'NZ Aquifers (White 2001)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_aquifers', children: "nz_other", visible: false, opacity: .50 },
    { id: '1', catalog_uid: "", title: 'New Zealand regions', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_regions', children: "nz_other", visible: true, opacity: .60 },
    { id: '1', catalog_uid: "", title: 'DTS Cable Position(Ngongotaha Valley)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'DTS_Cable_Position', children: "nz_other", visible: false, opacity: 1 },
    { id: '1', catalog_uid: "", title: 'Matata geological model', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'matata_model', children: "nz_overview", visible: false, opacity: .50 },
    { id: '1', catalog_uid: "", title: 'Tauranga geological model', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'tauranga_model', children: "nz_overview", visible: false, opacity: .50 },
    { id: '1', catalog_uid: "", title: 'Rotorua geological model', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rotorua_model', children: "nz_overview", visible: false, opacity: .50 },
    { id: '1', catalog_uid: "", title: 'Rangitaiki geological model', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rangitaiki_model', children: "nz_overview", visible: false, opacity: .50 },
    { id: '1', catalog_uid: "", title: 'Horowhenua Area', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'study_area', children: "nz_overview", visible: false, opacity: .70 },
    { id: '1', catalog_uid: "", title: 'NGMP Sites', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ngmp-locations', children: "nz_overview", visible: true, opacity: 1.00 },
    // {id: '2', title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL,        workspace: 'x765',          name: 'x765', children: "ho_geology", visible: false, opacity: .90},
    // {id: '2', title: 'Linz NZ Mainland Topo50',         geoserverURL: linzwms_URL,        workspace: 'x767',          name: 'x767', children: "ho_geology", visible: false, opacity: .90},
    { id: '2', title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50765', children: "ho_geology", visible: false, opacity: .90 },
    { id: '2', title: 'Linz NZ Mainland Topo50', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50767', children: "ho_geology", visible: false, opacity: .90 },
    { id: '2', title: 'NZ DTM 100x100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "ho_geology", visible: false, opacity: .80 },
    { id: '2', title: 'NZ GNS QMAP', geoserverURL: gnsqmapwms_URL, workspace: 'gns', name: 'NZL_GNS_1M_Lithostratigraphy', children: "ho_geology", visible: false, opacity: .80 },
    { id: '2', title: 'Equilibrium Water Table', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ewt_nzprj_new', children: "ho_hydro", visible: false, opacity: .60 },
    { id: '2', title: 'Holocene_top_100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Holocene_top_100_horo', children: "ho_geology", visible: false, opacity: .50 },
    { id: '2', title: 'Q2Q3Q4_top_100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Q2Q3Q4_top_100_horo', children: "ho_geology", visible: false, opacity: .50 },
    { id: '2', title: 'Q5_top_100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Q5_top_100_horo', children: "ho_geology", visible: false, opacity: .50 },
    { id: '2', title: 'Q6_top_100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Q6_top_100_horo', children: "ho_geology", visible: false, opacity: .50 },
    { id: '2', title: 'Greywacke_top_100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Greywacke_top_100_horo', children: "ho_geology", visible: false, opacity: .50 },
    { id: '2', title: 'Study Area', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'study_area', children: "ho_base_info", visible: true, opacity: .70 },
    { id: '2', title: 'Soil Groups', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'howrowhenua_9soils', children: "ho_geology", visible: false, opacity: .70 },
    { id: '2', title: 'Landuse', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'horowhenua_landuse', children: "ho_geology", visible: false, opacity: .70 },
    { id: '2', title: 'QMAP Clip', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'qmap_clip', children: "ho_geology", visible: false, opacity: .70 },
    { id: '2', title: 'Groundwater Catchments', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'catchments', children: "ho_base_info", visible: true, opacity: .80 },
    { id: '2', title: 'Lakes', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'lakes', children: "ho_base_info", visible: true, opacity: 1.00 },
    { id: '2', title: 'Rivers/Streams', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rivers', children: "ho_base_info", visible: false, opacity: 1.00 },
    { id: '2', title: 'gaining/loosing, sel. rivers', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'river_gaining_loosing', children: "ho_hydro", visible: false, opacity: 1.00 },
    { id: '2', title: 'Mean rainfall contours', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'horowhenua_mean_rainfall_contours', children: "ho_hydro", visible: false, opacity: .80 },
    { id: '2', title: 'Evaporation contours', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'evaporation_contours', children: "ho_hydro", visible: false, opacity: .80 },
    { id: '2', title: 'GW level contours', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'groundwater_level_contours', children: "ho_hydro", visible: false, opacity: 1.00 },
    { id: '2', title: 'Springs', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Horowhenua_springs', children: "ho_base_info", visible: false, opacity: 1.00 },
    { id: '2', title: 'general Wells', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'wells', children: "ho_base_info", visible: false, opacity: 1.00 },
    { id: '2', title: 'Surface water measurements', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'surface_waterpoints', children: "ho_hydro", visible: false, opacity: 1.00 },
    { id: '2', title: 'Waikawa Lakes subdivision piezometers', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'waikawa_subdivision_piezometers', children: "ho_hydro", visible: false, opacity: 1.00 },
    { id: '2', title: 'Groundwater level measurements', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'groundwater_level_measurements', children: "ho_hydro", visible: false, opacity: 1.00 },
    { id: '2', title: 'SoE gwl monitoring wells', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'soe_gwl_monitoring_wells', children: "ho_hydro", visible: true, opacity: 1.00 },
    //    {id: '3', title: 'Linz NZ Terrain Relief (Topo50)',       geoserverURL: linzwms_URL,        workspace: 'x765',          name: 'x765', children: "ng_dts_exp", visible: false, opacity: .90},
    //    {id: '3', title: 'Linz NZ Mainland Topo50',               geoserverURL: linzwms_URL,        workspace: 'x767',          name: 'x767', children: "ng_dts_exp", visible: false, opacity: .90},
    { id: '3', title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50765', children: "ng_dts_exp", visible: false, opacity: .90 },
    { id: '3', title: 'Linz NZ Mainland Topo50', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50767', children: "ng_dts_exp", visible: false, opacity: .90 },
    { id: '3', title: 'NZ DTM 100x100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "ng_dts_exp", visible: false, opacity: .80 },
    { id: '3', title: 'Equilibrium Water Table', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ewt_nzprj_new', children: "ng_dts_exp", visible: false, opacity: .60 },
    { id: '3', title: 'NZ Aquifers (White 2001)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_aquifers', children: "ng_dts_exp", visible: false, opacity: .50 },
    { id: '3', title: 'DTS Cable Position(Ngongotaha Valley)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'DTS_Cable_Position', children: "ng_dts_exp", visible: true, opacity: 1.00 },
    { id: '3', title: 'Rotorua geological model', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rotorua_model', children: "ng_dts_exp", visible: true, opacity: .20 },
    //  {id: "sac_add",    name: "Informative Layers", parent: "sac"}workspace: namespace_local, name: 'nz_aquifers', children: "sac_add", visible: false, opacity: .50},
    { id: '4', catalog_uid: "", title: 'NGMP Sites', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ngmp-locations', children: "sac_add", visible: false, opacity: 1.00 },
    { id: '4', catalog_uid: "", title: 'NZ Aquifers (White 2001)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_aquifers', children: "sac_add", visible: false, opacity: .50 },
    { id: '4', catalog_uid: "", title: 'New Zealand regions', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_regions', children: "sac_add", visible: false, opacity: .70 },
    { id: '4', catalog_uid: "", title: 'NZ DTM 100x100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "sac_add", visible: false, opacity: .70 },
    //  {id: "sac_geophys",  name: "Sel. Geophysics", parent: "sac"},
    { id: '4', catalog_uid: "", title: 'Equilibrium Water Table (NZ)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ewt_nzprj_new', children: "sac_geophys", visible: false, opacity: .60 },
    { id: '4', catalog_uid: "", title: 'Monthly Potential Evapotranspiration (NZ)', geoserverURL: earth2observe_URL, workspace: '', name: 'PET', children: "sac_geophys", visible: false, opacity: .60 },
    { id: '4', catalog_uid: "", title: 'PET Uncertainty (NZ)', geoserverURL: earth2observe_URL, workspace: '', name: 'Uncertainty', children: "sac_geophys", visible: false, opacity: .70 },
    { id: '4', catalog_uid: "", title: 'Hawkes Bay', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'HawkesBay_geophys', children: "sac_geophys", visible: true, opacity: .80 },
    { id: '4', catalog_uid: "", title: 'Canterbury', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'canterbury_region', children: "sac_geophys", visible: true, opacity: .80 },
    { id: '4', catalog_uid: "", title: 'Horizons Tararua', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'Horizons_Tararua', children: "sac_geophys", visible: true, opacity: .80 },
    { id: '4', catalog_uid: "", title: 'Otago EM', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'OtagoEM', children: "sac_geophys", visible: true, opacity: .80 },
    { id: '4', catalog_uid: "", title: 'Waipa Catchment', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'waipa_catchment', children: "sac_geophys", visible: true, opacity: .80 },
    //    {id: "sac_dts",  name: "GW-SW Interaction, DTS", parent: "sac"}    
    { id: '4', catalog_uid: "", title: 'FODTS Testsites', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'FODTS-Testsites', children: "sac_dts", visible: true, opacity: .80 },
    //  {id: "sac_tracers",  name: "Novel Tracers", parent: "sac"},
    { id: '4', catalog_uid: "", title: 'Halon-1301 Sampling Sites', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'hutt_halon_sites', children: "sac_tracers", visible: true, opacity: .80 },
    //  {id: "sac_datavis",  name: "DataVis and SOS", parent: "sac"},
    { id: '4', catalog_uid: "", title: 'Horowhenua Area (3D)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'study_area', children: "sac_datavis", visible: true, opacity: .80 },
    { id: '5', catalog_uid: "", title: 'Linz NZ Terrain Relief (Topo50)', geoserverURL: linzwms_URL_new, workspace: '', name: 'layer-50765', children: "awa_add", visible: false, opacity: .90 },
    //{id: '5', catalog_uid: "", title: 'Linz NZ Mainland Topo50',         geoserverURL: linzwms_URL_new,              workspace: '',          name: 'layer-50767', children: "awa_add", visible: false, opacity: .90},
    { id: '5', catalog_uid: "", title: 'NZ DTM 100x100', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz-dtm-100x100', children: "awa_add", visible: false, opacity: .80 },
    { id: '5', catalog_uid: "", title: 'NZ GNS QMAP', geoserverURL: gnsqmapwms_URL, workspace: 'gns', name: 'NZL_GNS_1M_Lithostratigraphy', children: "awa_add", visible: false, opacity: .80 },
    { id: '5', catalog_uid: "", title: 'NZ Aquifers (White 2001)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'nz_aquifers', children: "awa_add", visible: false, opacity: .50 },
    { id: '5', catalog_uid: "", title: 'Rotorua geological model (GNS)', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'rotorua_model', children: "awa_add", visible: false, opacity: .50 },
    { id: '5', catalog_uid: "", title: 'Lake Rotorua Sub Catchments (June 2014)', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'Rotorua_subcatchments', children: "awa_catch", visible: false, opacity: .70 },
    { id: '5', catalog_uid: "", title: 'QMAP geology, clipped', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'QMAP_clips', children: "awa_catch", visible: false, opacity: .70 },
    { id: '5', catalog_uid: "", title: 'Awahou Stream Catchment (June 2014)', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'AwahouCatchment', children: "awa_catch", visible: false, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'Awahou Groundwater Catchment (June 2014)', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'GW_Awahou_1_10000_9_June_2014', children: "awa_catch", visible: true, opacity: .60 },
    { id: '5', catalog_uid: "", title: 'Hamurana Springs', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'Hamurana_Springs', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'Taniwha Springs', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'Taniwha_Spring', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'Monitoring Bores (Dewhurst 1996)', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'Bores_Dewhurst1996', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'Consented Takes', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'ConsentedTakes', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'BOPRC SW quality sites', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'BOPRC_SW_sites', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'BOPRC SW flow sites', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'BOPRC_SWflow', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'Mean Residence Times', geoserverURL: geoserverURL_awahou, workspace: namespace_awahou, name: 'MRT', children: "awa_catch", visible: true, opacity: 1.00 },
    { id: '5', catalog_uid: "", title: 'NGMP Sites', geoserverURL: geoserverURL_local, workspace: namespace_local, name: 'ngmp-locations', children: "awa_add", visible: true, opacity: 1.00 }
];
console.log('loaded');
console.log(mapContextSpecs);
console.log(overlaySpecs);
