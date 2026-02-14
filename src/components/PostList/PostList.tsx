import { useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMAGE_PLACEHOLDERS, IMAGE_ALT_TEXT } from "../../constants/images";

type PostListProps = {
  date: string;
  title: string;
  slug: string;
  imageCover: string;
};

const PostList = ({ date, title, slug, imageCover }: PostListProps) => {
  const dateString = useMemo(() => {
    const newDate = new Date(date).toUTCString();
    return newDate.split(" ").slice(0, 4).join(" ");
  }, [date]);

  return (
    <article>
      <Link href={`/blog/${slug}`} className="nav-link" passHref>
        <h2>{title}</h2>
        <small>{dateString} | Lenny Peters</small>
        <Image
          src={imageCover || IMAGE_PLACEHOLDERS.BLOG_COVER}
          width={720}
          height={405}
          alt={IMAGE_ALT_TEXT.BLOG_COVER}
        />
      </Link>
    </article>
  );
};

export default PostList;
