"use server"

import connectDb from "@/lib/db"
import Auth from "@/models/Auth"
import { getAccessToken, getMe } from "@/utils/twitter"

export const checkCode = async (state: string, code: string) => {
    
    await connectDb()

    const auth = await Auth.findOne({ state: state })

    if (!auth) {
        throw new Error("Auth not found.")
    }

    const accessToken = await getAccessToken(code, auth.verifier)

    if (!accessToken) {
        throw new Error("Failed to get access token.")
    }

    const twitterUser = await getMe(accessToken)

    if (!twitterUser) {
        throw new Error("Failed to get user.")
    }

    await Auth.findOneAndUpdate({ state: state }, {
        id: twitterUser.id,
        name: twitterUser.name,
        username: twitterUser.username,
        token: accessToken
    })

    return twitterUser.username

}

export const markDownloaded = async (state: string) => {

    const auth = await Auth.findOne({ state: state })

    if (!auth) {
        throw new Error("Auth not found.")
    }

    const upd = await Auth.updateOne({ state: state }, {
        downloaded: true
    })

    if (!upd) {
        throw new Error("Failed to update.")
    }

    return true

}