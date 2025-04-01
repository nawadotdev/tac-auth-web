"use client";
import { useRouter } from "next/router";
import Head from "next/head";

const TwitterCardPage = () => {
  const router = useRouter();
  const { username } = router.query;

  const user = username || "TwitterUser";

  return (
    <>
      <Head>
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={`${user} linked with TAC.build`} />
        <meta name="twitter:title" content={`${user} linked with TAC.build`} />
        <meta name="twitter:description" content={`${user} linked with TAC.build`} />
        <meta
          name="twitter:image"
          content={`https://link.tac.build/api/twitter-card?username=${user}`}
        />
      </Head>

      <h1>Twitter Card Page for {user}</h1>
    </>
  );
};

export default TwitterCardPage;
