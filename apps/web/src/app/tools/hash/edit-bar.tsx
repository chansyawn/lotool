"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@lotool/ui";
import { TEXT_ENCODING_LIST, type TextEncoding } from "@lotool/lib/text-encoding";
import React from "react";

interface EditBarProps {
  outEncoding: TextEncoding;
  onOutputEncodingChange: (value: TextEncoding) => void;
}

export function EditBar({ outEncoding, onOutputEncodingChange }: EditBarProps) {
  return (
    <div className="flex flex-wrap items-end gap-2">
      <EditBarItem label="Output Encoding">
        <Select
          value={outEncoding}
          onValueChange={(value: TextEncoding) => {
            onOutputEncodingChange(value);
          }}
        >
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(TEXT_ENCODING_LIST).map((item) => (
              <SelectItem key={item} value={item}>
                {item}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </EditBarItem>
    </div>
  );
}

function EditBarItem({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="px-1 text-sm font-medium">{label}</div>
      {children}
    </div>
  );
}
