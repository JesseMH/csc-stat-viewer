import * as React from "react";

export const GridContainer = ( { children }: { children: React.ReactNode | React.ReactNode[]} ) => <div className="grid grid-cols-2 gap-2 p-2 m-2">{children}</div>;

export function GridStat( { name, value, rowIndex }: { name: string, value: string | number | React.ReactNode, rowIndex: number }){
    return (
        <div className={`grid grid-cols-2 ${ rowIndex % 2 ? "bg-midnight2" : ""}`}>
			<div className={`text-left pl-2`}>
				{name}
			</div>
			<div className={`text-right pr-2`}>
				<strong>{value}</strong>
			</div>
        </div>
    );
}