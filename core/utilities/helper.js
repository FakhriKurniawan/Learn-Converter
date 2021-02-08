export const  helper = {
    getConfig: (configName, defaultValue) => process.env[configName]===undefined?defaultValue : process.env[configName]
}