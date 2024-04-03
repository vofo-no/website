import Image from "next/image";

import FriendsSvg from "./friends.svg";

export function PostListEmpty() {
  return (
    <p className="text-center text-muted-foreground">
      <Image
        src={FriendsSvg}
        alt=""
        className="max-w-xs w-2/3 max-h-48 mx-auto"
      />
      Ingen saker
    </p>
  );
}
