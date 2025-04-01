import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: { username: string } }) {
  // `params`'i asenkron olarak işle
  const username = await Promise.resolve(params.username || "default_user");

  if (!username) return notFound();

  const imageUrl = `https://link.tac.build/api/twitter-card?username=${username}`;

  return {
    title: `${username} - Twitter Card`,
    description: `${username} için özel oluşturulmuş Twitter Card.`,
    openGraph: {
      title: `${username} - Twitter Card`,
      description: `${username} için özel oluşturulmuş Twitter Card.`,
      images: [imageUrl],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      site: "@yourtwitter",
      creator: "@yourtwitter",
      title: `${username} - Twitter Card`,
      description: `${username} için özel oluşturulmuş Twitter Card.`,
      images: [imageUrl],
    },
  };
}

export default function UserPage({ params }: { params: { username: string } }) {
  // `params`'i doğrudan kullanma, component içinde işlem yap
  const username = params?.username || "default_user";

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Twitter Card - {username}</h1>
      <p>Kullanıcı adı: @{username}</p>

      <div className="mt-6">
        <h2 className="text-lg font-semibold">Önizleme:</h2>
        <img
          src={`https://link.tac.build/api/twitter-card?username=${username}`}
          alt={`${username} için Twitter Card`}
          className="mt-4 border border-gray-300 rounded-lg shadow-md w-[600px] h-auto"
        />
      </div>

      <div className="mt-4">
        <p className="text-gray-600">Twitter'da önizleme yapmak için aşağıdaki linki kopyalayın:</p>
        <code className="bg-gray-200 p-2 rounded">{`https://link.tac.build/${username}`}</code>
      </div>
    </main>
  );
}
