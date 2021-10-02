// {
//     mainType: 'zaea',
//     secondaryType0: 'zaezae',
//     secondaryType1: 'zaeaze',
//     secondaryType2: 'bad'
//   }

import { driver } from "../connection"


export const createNodeAndRelationNodes = async (payload:any): Promise<any> => {
    const session = driver.session();
    let parentNodeType = "";
    try {
        for ( const key in payload ) {        
            if ( key.includes("mainType") ) {
                parentNodeType = payload[key];
                await session.run(`MERGE (a:${parentNodeType}) RETURN a`); // create only if not exist, else match
            }
        
            if ( key.includes('secondaryType') ) {
            //MATCH (a:Sylvain), (b:Neungruetai) CREATE (a)-[r:TEST]->(b)
                await session.run(`MERGE (a:${payload[key]}) RETURN a`);
                await session.run(`MATCH (a:${parentNodeType}), (b:${payload[key]}) MERGE (a)-[r:Criteria]->(b)`);
                await session.run(`MATCH (a:${parentNodeType}), (b:${payload[key]}) MERGE (b)-[r:Criteria]->(a)`);
            }
        }
        await session.close();
        return new Promise( (resolve, _reject) => {
            resolve("OK")
        })
    } catch (e) {
        console.log(e);
        await session.close();
        return new Promise( (resolve, _reject) => {
            resolve(e)
        })
    } finally {
        await session.close();
        return new Promise( (resolve, _reject) => {
            resolve("OK")
        })
    }
    
}