import {
  IconType,
  SiBluesky,
  SiFacebook,
  SiInstagram,
  SiLinkedin,
  SiTiktok,
  SiTwitch,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

export const SomeIcons: Record<string, IconType> = {
  Bluesky: SiBluesky,
  Facebook: SiFacebook,
  Instagram: SiInstagram,
  LinkedIn: SiLinkedin,
  Tiktok: SiTiktok,
  Twitch: SiTwitch,
  YouTube: SiYoutube,
};

export const someIconsHoverClassName: Record<string, string> = {
  Bluesky: `hover:text-si-bluesky`,
  Facebook: `hover:text-si-facebook`,
  Instagram: `hover:text-si-instagram`,
  LinkedIn: `hover:text-si-linkedin`,
  Tiktok: `hover:text-si-tiktok`,
  Twitch: `hover:text-si-twitch`,
  YouTube: `hover:text-si-youtube`,
};
