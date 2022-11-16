import { Player, useAsset, useUpdateAsset } from "@livepeer/react";
import React, { useState } from "react";
import { parseCid } from "livepeer/media";
interface ButtonProps {
  asset: File;
  progress: any;
  assets: any;
}

export default function Card({ asset, progress, assets }: ButtonProps) {
  const [videoAsset, setVideoAsset] = useState(asset);
  const phase = progress?.[0]?.phase;
  const percent = Math.round(progress?.[0]?.progress * 100);
  const { data: data } = useAsset({
    assetId: assets?.[0]?.id,
    refetchInterval: 10000,
  });

  const { mutate: updateAsset } = useUpdateAsset({
    assetId: assets?.[0]?.id,
    storage: { ipfs: true },
  });

  if (phase == "ready" && data) {
    console.log("Data =>", data);
  }

  return (
    <>
      {!data?.storage?.ipfs?.cid ? (
        <div className="bg-white shadow-md rounded-lg  w-[40%] mt-8">
          <div className="flex flex-row items-center">
            <div className="flex justify-center items-center  w-24 h-20	 bg-gradient-to-r from-[#00A660] to-[#28CE88] rounded-l-lg">
              <span className="text-xl font-poppins font-semibold text-white">
                .{videoAsset.name.split(".").pop()}
              </span>
            </div>
            <div className="flex flex-col justify-center items-start ml-8">
              <span className="text-md text-slate-900 font-medium">
                {videoAsset?.name}
              </span>

              {phase == "ready" ? (
                <span
                  onClick={() => {
                    updateAsset?.();
                  }}
                  className="text-md text-green-500 font-medium hover:underline cursor-pointer"
                >
                  Save to IPFS
                </span>
              ) : (
                <span className="text-md text-slate-700">
                  {Math.round(asset?.size / 1000 / 1000)} MB{" "}
                  {phase && "| " + phase}{" "}
                  {percent ? "(" + percent + "%" + ")" : ""}
                </span>
              )}
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="mt-2 mb-4">IPFS CID: {data?.storage?.ipfs?.cid}</p>
          <div className="bg-white shadow-md rounded-lg  w-[40%]">
            <Player
              title={videoAsset.name}
              src={`https://ipfs.livepeer.studio/ipfs/${data?.storage?.ipfs?.cid}`}
              autoPlay
              muted
              autoUrlUpload
            />
          </div>
        </>
      )}
    </>
  );
}
