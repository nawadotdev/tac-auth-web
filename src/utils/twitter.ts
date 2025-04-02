const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REDIRECT_URI = process.env.REDIRECT_URI;

function base64Encode(str:string) {
    return Buffer.from(str).toString('base64');
}

interface Oauth2TokenResponse {
    token_type: string
    access_token: string
    expires_in: number
    scope: string
}

export const getAccessToken = async (code: string, verifier : string) : Promise<string> => {
    const resp = await fetch("https://api.x.com/2/oauth2/token",{
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Basic ${base64Encode(CLIENT_ID + ":" + CLIENT_SECRET)}`
        },
        body: `grant_type=authorization_code&code=${code}&redirect_uri=${REDIRECT_URI}&client_id=${CLIENT_ID}&code_verifier=${verifier}`
    })

    if(!resp.ok) {
        throw new Error("Failed to get access token")
    }

    const data = await resp.json() as Oauth2TokenResponse

    return data.access_token
}

export interface GetMeResponse {
    data : TwitterUser
}

export interface TwitterUser {
    id: string
    name: string
    username: string
}

export const getMe = async (token: string) : Promise<TwitterUser> => {

    const resp = await fetch("https://api.x.com/2/users/me", {
        method: "GET",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": `Bearer ${token}`
        }
    })

    if(!resp.ok) {
        throw new Error("Failed to get me")
    }

    const data = await resp.json() as GetMeResponse

    return data.data

}

export const getFollowers = async (token: string, userId: string) => {
    console.log(token, userId)
    const resp = await fetch(`https://api.x.com/2/users/${userId}/followers`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })

    if(!resp.ok) {
        console.log(resp.statusText)
        throw new Error("Failed to get followers")
    }

    const data = await resp.json()

    return data

}