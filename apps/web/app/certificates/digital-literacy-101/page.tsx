"use client";

import Link from "next/link";

export default function DigitalLiteracyCertificatePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-10">
      <div className="w-full max-w-[1200px] flex flex-col gap-3">
        <div className="flex justify-between items-center mb-6">
          <div className="text-xl font-black text-slate-900">Future Proofer</div>
          <div className="flex gap-2">
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Print
            </button>
            <button className="px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Download PDF
            </button>
            <button className="px-4 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Share to LinkedIn
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-10 shadow-sm flex flex-col items-center">
          <div className="w-full max-w-[800px] border-[12px] border-slate-100 p-1 rounded-sm shadow-inner mb-8">
            <div className="border-2 border-slate-200 p-12 flex flex-col items-center text-center relative">
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-4">Thinkforge Learning Hub</div>
              <div className="font-black text-slate-900 leading-tight text-[34px] tracking-[-0.5px]">
                CERTIFICATE OF
              </div>
              <div className="font-black text-slate-900 leading-tight text-[34px] tracking-[-0.5px]">
                ACHIEVEMENT
              </div>
              <div className="text-sm text-slate-400 font-medium mt-3">
                This is to certify that
              </div>
              <div className="text-[42px] font-black text-[#0f52ba] mt-2 italic">
                Amina Osei
              </div>

              <div className="text-sm text-slate-400 font-medium mt-3.5">
                for successfully completing
              </div>
              <div className="text-xl font-black text-slate-900 mt-1.5">
                Digital Literacy 101
              </div>
              <div className="text-[12px] text-slate-400 font-medium mt-1.5">
                Awarded on Jan 26, 2026
              </div>

              <div className="w-full flex justify-between mt-7">
                <div className="text-left">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Instructor</div>
                  <div className="text-sm font-black text-slate-900">
                    Marcus Thorne
                  </div>
                  <div className="text-[12px] text-slate-400 font-medium">
                    Lead Instructor, Thinkforge
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-1">Certificate ID</div>
                  <div className="text-sm font-black text-slate-900">
                    TF-8829
                  </div>
                  <div className="text-[12px] text-slate-400 font-medium">
                    Verification QR (placeholder)
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-slate-100 text-[10px] text-slate-400 font-medium text-center max-w-[500px] mx-auto">
              This certificate is issued by Thinkforge’s verification system. You can always access it in your Future Proofer
              dashboard.
            </div>
          </div>

          <div className="flex gap-2 mt-3">
            <Link href="/thinkforge/course-completed" className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all">
              Back to Celebration Screen
            </Link>
            <Link href="/thinkforge" className="px-6 py-3 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Back to Thinkforge
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
