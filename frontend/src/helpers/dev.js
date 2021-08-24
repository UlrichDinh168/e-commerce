/**
 * Collection of simple functions to help with development
 *
 * @author Oskari Samiola <Oskari@vertics.co>
 *
 * @copyright Vertics Oy 2021
 *  
 */


export function log(object) {
    if (process.env.NODE_ENV === "development") {
        console.log(object);
    }
}