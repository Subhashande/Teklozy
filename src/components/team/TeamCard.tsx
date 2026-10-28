import React from 'react';
import { TeamMember } from '../../data/teamData';

// LinkedIn Icon (Standard SVG)
const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 fill-current' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z" />
  </svg>
);

// GitHub Icon (Standard SVG)
const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 fill-current' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);

// X (formerly Twitter) Icon
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-3.5 h-3.5 fill-current' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

// Dribbble Icon
const DribbbleIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4 fill-current' }) => (
  <svg className={className} viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm7.42 8.72c-.82-.09-2.58-.2-4.6.43-.1-.23-.2-.46-.31-.69-.47-.97-.99-1.92-1.57-2.82 2.7.94 5.08 2.05 6.48 3.08zm-9.39-5.96c.64.93 1.22 1.91 1.73 2.91-.49.16-1 .35-1.54.55-2.2.82-4.08 1.95-4.87 2.47C6.18 7.95 8.1 5.6 10.03 4.76zM4.16 12.35c.03-.02.43-.28 1.15-.69.96-.55 2.53-1.49 4.67-2.19.46-.15.9-.27 1.34-.38-.2.53-.42 1.07-.66 1.62-.97 2.2-2.3 4.48-3.9 6.25-1.54-1.23-2.45-3.04-2.6-4.61zm6.06 7.22c1.47-1.64 2.7-3.76 3.61-5.77.26-.58.49-1.16.69-1.74 1.83-.54 3.39-.47 4.1-.42.06.45.1.9.1 1.36 0 3.66-2.48 6.74-5.87 7.72-.88-.34-1.78-.73-2.63-1.15zm4.84-8.87c-.18.51-.38 1.03-.61 1.54-.83 1.84-1.95 3.75-3.29 5.28-.43-.21-.86-.44-1.28-.69-1.48-.88-2.67-1.94-3.52-2.85 1.4-1.54 2.58-3.5 3.44-5.4.38-.08.76-.14 1.14-.18 1.59-.16 2.94.39 4.12 2.3z" />
  </svg>
);

interface TeamCardProps {
  member: TeamMember;
}

export const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  return (
    <div className="group bg-white rounded-2xl border border-slate-200/90 shadow-2xs hover:shadow-lg transition-all duration-300 p-3 sm:p-4 flex flex-col">
      {/* Photo Container with soft sky-blue backdrop matching reference design */}
      <div className="relative w-full aspect-[4/4.2] rounded-xl overflow-hidden bg-gradient-to-b from-[#BAE6FD]/40 to-[#E0F2FE]/60 mb-3.5">
        <img
          src={member.photoUrl}
          alt={member.name}
          loading="lazy"
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Role/Category Pill (Bottom Left of photo) */}
        <div className="absolute bottom-2.5 left-2.5 z-10">
          <span className="bg-white/95 backdrop-blur-xs text-slate-800 text-[11px] font-semibold px-2.5 py-0.5 rounded-full shadow-2xs border border-white/60 inline-block">
            {member.categoryLabel}
          </span>
        </div>
      </div>

      {/* Member Info */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-display font-bold text-base text-slate-900 tracking-tight">
            {member.name}
          </h3>
          <p className="text-xs font-semibold text-slate-500 mt-0.5">
            {member.role}
          </p>
          <p className="text-xs text-slate-500 leading-relaxed mt-2 line-clamp-2">
            {member.bio}
          </p>
        </div>

        {/* Social Links Row */}
        <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center gap-3 text-slate-400">
          {member.socials.linkedin && (
            <a
              href={member.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on LinkedIn`}
              className="hover:text-[#0088E0] transition-colors cursor-pointer"
            >
              <LinkedInIcon className="w-4 h-4 fill-current" />
            </a>
          )}

          {member.socials.github && (
            <a
              href={member.socials.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on GitHub`}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              <GitHubIcon className="w-4 h-4 fill-current" />
            </a>
          )}

          {member.socials.dribbble && (
            <a
              href={member.socials.dribbble}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on Dribbble`}
              className="hover:text-[#EA4C89] transition-colors cursor-pointer"
            >
              <DribbbleIcon className="w-4 h-4 fill-current" />
            </a>
          )}

          {member.socials.twitter && (
            <a
              href={member.socials.twitter}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on X`}
              className="hover:text-slate-900 transition-colors cursor-pointer"
            >
              <XIcon className="w-3.5 h-3.5 fill-current" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
