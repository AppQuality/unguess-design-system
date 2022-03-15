import { Tiles as ZendeskTiles } from "@zendeskgarden/react-forms";
import { TilesArgs } from "./_types";

/**
 * Tiles are Radio buttons styled with icons or images.

 * Used for this:
    - Like Radios, Tiles are for choices that can't occur at the same time

 * Not for this:
    - To choose more than one option at once, use a Checkbox instead
    - To select from a long list of options, use a Select
    - To define an action, use a Button instead
    - For navigation, use an Anchor instead
 */
const Tiles = (props: TilesArgs) => <ZendeskTiles {...props} />;

Tiles.Description = ZendeskTiles.Description;
Tiles.Icon = ZendeskTiles.Icon;
Tiles.Label = ZendeskTiles.Label;
Tiles.Tile = ZendeskTiles.Tile;

export { Tiles };
