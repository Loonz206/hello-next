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
          alt="Company logo" // Improved alt text for accessibility
          className="svg"
          width={200}
          height={200}
        />
        <div className="job-role">{jobRole}</div>
      </Link>
      <Link href={handle} target="_blank" rel="noopener noreferrer" passHref>
        {twitterHandle}
      </Link>
    </div>
  );
};

export default PageProfileCard;
