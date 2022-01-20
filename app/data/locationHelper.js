const locationPaths = {
    Boscombe: require("../data/SouthEngland/Boscombe-spot1323_3_11_2021.json"),
    Bournemouth: require("../data/SouthEngland/Bournemouth-Spot12.json"),
    Croyde: require("../data/SouthEngland/Croyde_7.json"),
    Highcliffe: require("../data/SouthEngland/Highcliffe_1161.json"),
    Kimmeridge: require("../data/SouthEngland/Kimmeridge-spot11.json"),
    Newquay: require("../data/SouthEngland/Newquay_1.json"),
    Polzeath: require("../data/SouthEngland/Polzeath_969.json"),
    Saunton: require("../data/SouthEngland/Saunton_1322.json"),
    Southbourne: require("../data/SouthEngland/Southbourne_1329.json"),
    Weymouth: require("../data/SouthEngland/Weymouth_7833.json"),
    Woolacombe: require("../data/SouthEngland/Woolacombe_1352.json")
}

/**
 * Gets the data for all locations.
 * @returns locationPaths;
 */
const locationHelper = () => {
    return locationPaths;
}

export default locationHelper;