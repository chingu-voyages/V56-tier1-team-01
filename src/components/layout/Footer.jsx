import React from 'react'

export default function Footer() {
    return (
        <div className="bg-white relative left-0 bottom-0 w-full flex flex-col items-center md:flex-row gap-0 md:gap-20 justify-center pb-0 md:pb-3 pt-0 md:pt-3 border-t">
            <div className="flex flex-col items-center px-2 gap-1">
                <p className="font-semibold pt-3 md:pt-0">Project GitHub Repo:</p>
                <p className="hover:underline underline md:no-underline"><a href="https://github.com/chingu-voyages/V56-tier1-team-01">Chingu Voyage 56 - Tier 1 - Team 1</a></p>
            </div>
            <div className="flex flex-col items-center pt-5 gap-1 md:pt-2">
                <p className="font-semibold">Team Members:</p>
                <div className="flex flex-col gap-1 items-center mb-2 md:flex-row md:gap-4">
                    <p className="hover:underline underline md:no-underline"><a href="https://github.com/abutler911" target="_blank">Andy</a></p>
                    <p className="hover:underline underline md:no-underline"><a href="https://github.com/conorwburke" target="_blank">Conor</a></p>
                    <p className="hover:underline underline md:no-underline"><a href="https://github.com/fcuevas6" target="_blank">Francisco</a></p>
                    <p className="hover:underline underline md:no-underline"><a href="https://github.com/jp249" target="_blank">Jehovangi</a></p>
                    <p className="hover:underline underline md:no-underline"><a href="https://github.com/shayla-develops-webs" target="_blank">Shayla</a></p>
                </div>
            </div>
        </div>
    )
}

