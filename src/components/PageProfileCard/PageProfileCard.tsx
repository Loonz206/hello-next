import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.svg";

type PageProfileCardProps = {
  twitterHandle: string;
  jobRole: string;
};

const PageProfileCard = ({ twitterHandle, jobRole }: PageProfileCardProps) => {
  const handle = `https://twitter.com/${twitterHandle}`;
  return (
    <div className="card-container">
      <Link className="nav-link" href="/" passHref>
        <Image
          priority={true}
          src={Logo}
          alt="logo"
          className="svg"
          width={200}
          height={200}
        />
        <br />
        {jobRole}
      </Link>
      <br />
      <Link href={handle} target="_blank" passHref>
        {twitterHandle}
      </Link>
    </div>
  );
};

export default PageProfileCard;
