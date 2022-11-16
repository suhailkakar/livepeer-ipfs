import { useRef, useState } from "react";
import { Button, Card } from "../components";
import { useCreateAsset, useUpdateAsset } from "@livepeer/react";
export default function Home() {
  const ref = useRef<HTMLInputElement>(null);
  const [asset, setAsset] = useState<File | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const {
    mutate: createAsset,
    data: assets,
    progress,
    error,
  } = useCreateAsset(
    asset
      ? {
          sources: [{ name: asset.name, file: asset }] as const,
        }
      : null
  );

  const ChooseAsset = async () => {
    ref.current?.click();
  };

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAsset(file);
  };

  const uploadAsset = async () => {
    setStatus("Uploading");
    await createAsset?.();
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen font-poppins">
      <h1 className="text-8xl font-bold text-slate-900 text-transparent bg-clip-text bg-gradient-to-r from-[#00A660] to-[#28CE88]">
        Livepeer x IPFS
      </h1>
      <h3 className="text-xl mt-4 text-slate-800 w-[50%] text-center">
        Upload, stream, and transcode video on the decentralized web with
        Livepeer and IPFS.
      </h3>
      <Button onClick={asset ? uploadAsset : ChooseAsset}>
        {asset ? "Upload the asset" : "Choose an asset"}
      </Button>
      <input type="file" ref={ref} className="hidden" onChange={onChange} />
      {asset && <Card asset={asset} progress={progress} assets={assets} />}

      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  );
}
