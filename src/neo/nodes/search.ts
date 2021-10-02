/*Match (n:Jaune)-[r:Criteria]->(m)
Return n,r,m*/

import { driver } from "../connection"


export const searchNodeAndRelations = async (nodeType:string): Promise<any> => {
    const session = driver.session();
    try {
        let result = await session.run(`MATCH (n:${nodeType})-[r:Criteria]->(m) RETURN labels(n), labels(m)`);

        return new Promise(resolve => {
            resolve(result);
        })

    } catch (e){
        await session.close();
        return new Promise( (resolve, reject) => {
            reject(e);
        })
    }
}