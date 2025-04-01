"use client";
import { Suspense, useEffect, useState } from "react";
import Head from "next/head";
import { useSearchParams } from "next/navigation";

const getCustomContent = (username: string) => {
    return {
        title: `${username} | Tac Build`,
        description: `Learn more on Tac Build!`,
        imageUrl: `https://link.tac.build/api/twitter-card?username=${username}`,
    };
};

const TwitterCardPage = () => {
    const searchParams = useSearchParams()
    const [username, setUsername] = useState<string | null>(null);

    useEffect(() => {
        const user = searchParams.get('username');
        console.log(user);
        setUsername(user);
    }, [searchParams]);

    if (!username) return <div>Loading...</div>;
    const { title, description, imageUrl } = getCustomContent(username);

    return (
        <>
            <Head>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@tac_build" />
                <meta name="twitter:title" content={title} />
                <meta name="twitter:description" content={description} />
                <meta name="twitter:image" content={imageUrl} />
            </Head>

            <h1>{title}</h1>
            <p>{description}</p>
        </>
    );
};

export default () => {
    <Suspense>
        <TwitterCardPage />
    </Suspense>
}
