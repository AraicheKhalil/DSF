import React from "react";
import Dropzone from "react-dropzone";
import {
  TransformWrapper,
  TransformComponent,
  useControls,
} from "react-zoom-pan-pinch";
import { FiZoomIn, FiZoomOut } from "react-icons/fi";
import { TbZoomReset } from "react-icons/tb";
const classess =
  "p-2 text-base sm:text-xl md:text-2xl border border-black rounded-md";


const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="flex justify-start items-start gap-4 mb-5 bg-black text-white w-full">
      <button className={classess} onClick={() => zoomIn()}>
        <FiZoomIn />
      </button>
      <button className={classess} onClick={() => zoomOut()}>
        <FiZoomOut />
      </button>
      <button className={classess} onClick={() => resetTransform()}>
        <TbZoomReset />
      </button>
    </div>
  );
};

const Filedrop = ({
  onDrop,
  error,
  selectedFiles,
  headerText,
  description,
  icon,
}) => {

  console.log(selectedFiles)
  return (
    <div className="flex-grow basis-48 rounded-md border-[2px] border-dashed pb-8 cursor-pointer">
      {selectedFiles && (
        <>
          <div className="w-full flex justify-center items-center overflow-auto flex-col max-h-[300px]">
            <TransformWrapper
              initialScale={1}
              initialPositionX={0}
              initialPositionY={0}
            >
              {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                  <Controls />
                  <TransformComponent>
                    <img
                      id="magnifier-target"
                      className="relative object-cover max-h-[450px] overflow-hidden"
                      src={URL.createObjectURL(selectedFiles)}
                      alt={`Selected file preview`}
                    />
                  </TransformComponent>
                </>
              )}
            </TransformWrapper>
          </div>
        </>
      )}
      {/* <Dropzone onDrop={onDrop} multiple={false}>
        {({ getRootProps, getInputProps }) => (
          <section className="px-2">
            <div
              {...getRootProps({
                className: "dropzone",
              })}
            >
              <input {...getInputProps()} />
              {error && (
                <div className="text-[13px] font-semibold text-center text-red-400">
                  <p>**{error}**</p>
                </div>
              )}
              <h3 className="satoshi-500 mt-2 text-[12px] text-center md:text-[14px] xl:text-[16px]">
                {headerText}{" "}
                <span className="text-blue-700 satoshi-500">browse</span>
              </h3>
              <p className="text-[--gray] text-[11px] sm:text-[12px] md:text-[14px] text-center">
                {description}
              </p>
            </div>
          </section>
        )}
      </Dropzone> */}
      <Dropzone onDrop={onDrop} multiple={true}>
  {({ getRootProps, getInputProps }) => (
    <section className="px-2">
      <div
        {...getRootProps({
          className: "dropzone",
        })}
      >
        <input {...getInputProps()} />
        {error && (
          <div className="text-[13px] font-semibold text-center text-red-400">
            <p>**{error}**</p>
          </div>
        )}
        <h3 className="satoshi-500 mt-2 text-[12px] text-center md:text-[14px] xl:text-[16px]">
          {headerText}{" "}
          <span className="text-blue-700 satoshi-500">browse</span>
        </h3>
        <p className="text-[--gray] text-[11px] sm:text-[12px] md:text-[14px] text-center">
          {description}
        </p>
      </div>
    </section>
  )}
</Dropzone>
    </div>
  );
};

export default Filedrop;
