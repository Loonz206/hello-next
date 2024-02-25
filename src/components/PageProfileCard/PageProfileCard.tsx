import Link from "next/link";
import Image from "next/image";
import Logo from "../../assets/logo.svg";

interface Props {
  twitterHandle: string;
  jobRole: string;
}

const PageProfileCard = ({ twitterHandle, jobRole }: Props) => {
  const handle = `https://twitter.com/${twitterHandle}`;
  return (
    <div className="card-container">
      <Link className="nav-link" href="/" passHref>
        <Image
          className="svg"
          src={Logo}
          alt="logo"
          height={200}
          width={200}
          priority
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
