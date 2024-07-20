import React, { useState } from "react";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form, useActionData, Link } from "@remix-run/react";
import Footer from "~/components/Footer";
import fs from "fs";
import path from "path";
import { parse } from "csv-parse/sync";

// Define the structure of our CSV data
interface KeyEntry {
  machine_serial: string;
  key_1: string;
  key_2: string;
}

const filePath = process.env.CSV_FILEPATH;

export const loader: LoaderFunction = async () => {
  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });
  return json(records);
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const serialKey = formData.get("serialKey") as string;

  const fileContent = await fs.promises.readFile(filePath, "utf-8");
  const records: KeyEntry[] = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
  });

  const entry = records.find((entry) => entry.machine_serial.toLowerCase() === serialKey.toLowerCase());
  return json({
    result: entry ? { key_1: entry.key_1, key_2: entry.key_2 } : "No matching keys found.",
  });
};
export default function Index() {
  const csvData = useLoaderData<KeyEntry[]>();
  const actionData = useActionData();
  const [serialKey, setSerialKey] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-tr from-blue-50 via-indigo-50 to-white dark:from-blue-950 dark:via-indigo-950 dark:to-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-4 flex flex-col flex-grow">
        {/* Main Header */}
        <header id="page-header" className="py-8">
          <Link to="/" className="group inline-flex items-center gap-2 text-lg font-bold tracking-wide text-gray-900 hover:text-gray-600 dark:text-gray-100 dark:hover:text-gray-300">
            <svg
              className="hi-outline hi-magnifying-glass inline-block size-6 text-gray-400 transition duration-200 group-hover:scale-110 group-active:scale-100 dark:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            <span>BITLookup</span>
          </Link>
        </header>

        {/* Main Content */}
        <main className="flex-grow flex items-center justify-center">
          <div className="max-w-2xl w-full text-center">
            <h1 className="mb-4 text-4xl font-black tracking-tight text-black xl:text-6xl dark:text-white">BitLocker Recovery Finder</h1>
            <h2 className="mb-6 font-medium leading-relaxed text-gray-700 lg:text-lg dark:text-gray-300">Recover faster from the CrowdStrike incident with our BitLocker Recovery Finder</h2>
            <div className="mb-8 inline-flex rounded-full bg-gray-100 px-2 py-1 text-xs font-semibold leading-4 text-gray-600">API Endpoint: https://bitlookup.net/search/xxxxxxxx</div>
            <Form method="post" className="mb-8">
              <div className="flex items-center rounded-xl bg-gray-300/25 p-3 dark:bg-white/10">
                <input
                  type="text"
                  id="serialKey"
                  name="serialKey"
                  placeholder="Computer serial key"
                  className="block w-full grow rounded-l-lg border border-transparent px-5 py-3 text-sm leading-6 placeholder-gray-500 focus:border-transparent focus:ring focus:ring-blue-500/75 sm:text-base dark:border-transparent dark:bg-gray-900/60 dark:placeholder-gray-400"
                  value={serialKey}
                  onChange={(e) => setSerialKey(e.target.value)}
                />
                <button
                  type="submit"
                  className="inline-flex flex-none items-center justify-center gap-2 rounded-r-lg border border-blue-700 bg-blue-700 px-2 py-3 text-sm font-medium leading-6 text-white hover:border-blue-600 hover:bg-blue-600 hover:text-white focus:ring focus:ring-blue-400/50 active:border-blue-700 active:bg-blue-700 sm:px-6 sm:text-base dark:focus:ring-blue-400/90"
                >
                  Find
                </button>
              </div>
            </Form>
            {actionData?.result && (
              <div className="mt-4 rounded-lg bg-white p-4 shadow-md dark:bg-gray-800">
                <h3 className="text-lg font-semibold">Your BitLocker keys:</h3>
                {typeof actionData.result === "string" ? (
                  <p className="mt-2">{actionData.result}</p>
                ) : (
                  <>
                    <p className="mt-2">Key 1: {actionData.result.key_1}</p>
                    <p className="mt-2">Key 2: {actionData.result.key_2}</p>
                  </>
                )}
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Banner at the bottom, aligned with the container */}
      <div className="container mx-auto px-4 mt-auto">
        <img src="/sample1.png" alt="Banner" className="w-full h-auto object-cover object-center" />
      </div>

      <Footer />
    </div>
  );
}
