import { PathLike } from "fs";

type AsyncCallback = (error: Error, ...args: []) => void;

interface FunctionArgument {
  type: number;
  value: boolean | string | number | Buffer;
}

interface ProcessHandle {
  th32ProcessID: number;
  cntThreads: number;
  th32ParentProcessID: number;
  pcPriClassBase: number;
  szExeFile: string;
  handle: number;
  modBaseAddr: number;
}

interface ProcessModule {
  modBaseAddr: number;
  modBaseSize: number;
  szExeFile: PathLike | string;
  szModule: string;
  th32ModuleID: number;
}

interface ProcessRegion {
  BaseAddress: number;
  AllocationBase: number;
  AllocationProtect: number;
  RegionSize: number;
  State: number;
  Protect: number;
  Type: number;
  szExeFile?: PathLike | string;
}

export function openProcess(
  processIdentifier: string,
  callback?: AsyncCallback
): ProcessHandle;

export function closeProcess(pHandle: number): void;
export function findModule(
  moduleName: string,
  pid: number,
  callback?: AsyncCallback
): ProcessModule;
export function getModules(pid: number): ProcessModule[];
export function getRegions(pHandle: number): ProcessRegion[];
export function callFunction(
  pHandle: number,
  args: FunctionArgument[],
  returnType: number,
  address: number,
  callback?: AsyncCallback
): { returnValue: any; exitCode: number };
// ? unknown output
export function readMemory(
  pHandle: number,
  address: number,
  dataType: number,
  callback?: AsyncCallback
): any;
export function readBuffer(
  pHandle: number,
  address: number,
  size: number,
  callback?: AsyncCallback
): Buffer;
export function writeBuffer(
  pHandle: number,
  address: number,
  buff: Buffer
): any;
export function findPattern(
  pHandle: number,
  moduleName: string,
  signature: string,
  signatureType: number,
  patternOffset: number,
  addressOffset: number,
  callback?: AsyncCallback
): any;
