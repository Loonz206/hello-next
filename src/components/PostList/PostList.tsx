import Link from "next/link";
import Image from "next/image";

const PostList = ({ date, title, slug, imageCover }) => {
  const newDate = new Date(date).toUTCString();
  const dateString = newDate.split(" ").slice(0, 4).join(" ");
  return (
    <article>
      <Link href={`/blog/${slug}`} className="nav-link" passHref>
        <h2>{title}</h2>
        <small>{dateString} | Lenny Peters</small>
        <Image
          priority={true}
          src={imageCover || "https://place-hold.it/720x405"}
          width={720}
          height={405}
          alt="a grey frame"
        />
      </Link>
    </article>
  );
};

export default PostList;
