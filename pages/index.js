import Head from "next/head";
// import icon
import { BsClipboardPlus } from "react-icons/bs";

const addToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};

export default function Home({ chatData }) {
  return (
    <div>
      <Head>
        <title>Gym Data </title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style>{`
p{
  padding:4px;
}
`}</style>
      <main className="max-w-lg mx-auto my-20 ">
        <div className="flex flex-col">
          {/* table header */}
          <div className="flex justify-between">
            <p className="border-blue-500 border w-1/5 ">Add to clipboard</p>
            <p className="border-blue-500 border w-1/2">Chat Id</p>
            <p className="border-blue-500 border w-1/2">Title</p>
          </div>
          {/* table body */}
          <div className="flex flex-col">
            {/* cell container */}
            {chatData.map((item) => (
              <div className=" flex " key={item.id}>
                <p
                  className="border-blue-500 border  w-1/5 flex justify-center items-center cursor-pointer"
                  onClick={() => {
                    addToClipboard(item.id);
                  }}
                >
                  <BsClipboardPlus />
                </p>
                <p className="border-blue-500 border w-1/2">{item.id}</p>
                <p className="border-blue-500 border w-1/2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch(process.env.BOT_LINK);
  const data = await res.json();
  const chatData = data.result
    .map((res) => {
      if ("my_chat_member" in res) {
        return {
          id: res.my_chat_member.chat.id,
          title: res.my_chat_member.chat.title,
        };
      }
    })
    .filter((item) => item != undefined);
  return {
    props: {
      chatData,
    },
  };
}
