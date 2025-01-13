import { Tiles as ZendeskTiles } from "@zendeskgarden/react-forms";
import { TilesArgs } from "./_types";

/**
 * DracCard are Cards styled with icons and images to engage CTA.

 * Used for this:
    - Like Radios, Tiles are for choices that can't occur at the same time

 * Not for this:
    - To choose more than one option at once, use a Checkbox instead
    - To select from a long list of options, use a Select
    - To define an action, use a Button instead
    - For navigation, use an Anchor instead
 */
const DracCard = (props: TilesArgs) => <ZendeskTiles {...props} />;

DracCard.Description = ZendeskTiles.Description;
DracCard.Icon = ZendeskTiles.Icon;
DracCard.Label = ZendeskTiles.Label;
DracCard.Tile = ZendeskTiles.Tile;

export { DracCard };
