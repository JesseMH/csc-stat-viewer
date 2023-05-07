import * as React from "react";
import { useDataContext } from "../../DataContext";
import {Link} from "wouter";
import {PlayerStats} from "../../models";
import { getPlayersInTierOrderedByRating } from "../../common/utils/player-utils";
import { ImArrowLeft, ImArrowRight } from "react-icons/im";
import {Chip, Ripple, initTE} from "tw-elements";
initTE({ Chip, Ripple });
type Props = {
    player: PlayerStats,
    playerIndex: number,
}
export function PlayerNavigator( { player, playerIndex }: Props ) {
    const pageSize = 8;
    const [ pageCurrent, setPageCurrent ] = React.useState( Math.floor(playerIndex/pageSize) );
    const { players = [] } = useDataContext();
        const playerStats: PlayerStats[] = players.filter( p => Boolean(p.stats) ).map( p => p.stats) as PlayerStats[];
        const playerInTierOrderedByRating = getPlayersInTierOrderedByRating( player!, playerStats );

    if( !player ){
        return null;
    }
    return (
        <div className="py-2">
                <div className="flex flex-row px-4 overflow-hidden" style={{width: "100%", justifyContent:"space-between"}}>
                    { pageCurrent > 0 && <button className="grow-0" onClick={ () => setPageCurrent( pageCurrent-1 )}><ImArrowLeft /></button> }
                        { playerInTierOrderedByRating.slice(pageCurrent*pageSize, pageCurrent*pageSize+pageSize).map(
                            (player, index) =>
                                <Link key={`closeby-${player.Name}`} to={`/players/${player.Tier}/${player.Name}`}>
                                    <div
                                        style={{userSelect:'none', lineHeight: '95%' }}
                                        className="my-[5px] mr-4 flex h-[32px] cursor-pointer items-center rounded-[4px] bg-[#eceff1] px-[12px] py-0 text-[11px] font-normal normal-case leading-loose text-[#4f4f4f] shadow-none hover:!shadow-none active:bg-[#cacfd1] dark:bg-midnight2 dark:text-neutral-200">
                                        <img className="my-0 -ml-[12px] mr-[8px] h-[inherit] w-[inherit] rounded-[4px]" src={players.find( p => p.name === player.Name )?.avatarUrl} alt=""/>
                                        {player.Name}
                                        <span
                                            className="ml-2 inline-block whitespace-nowrap rounded-[0.27rem] bg-midnight1 px-[0.65em] pb-[0.25em] pt-[0.35em] text-center align-baseline text-[0.9em] font-bold leading-none text-neutral-200"
                                        >{pageCurrent*pageSize+index+1}</span>
                                    </div>
                                </Link>
                            )
                        }
                    { pageCurrent*pageSize+pageSize < playerInTierOrderedByRating.length && <button className="grow-0" onClick={() => setPageCurrent( pageCurrent+1 )}><ImArrowRight /></button> }
                </div>
            </div>
    );
}