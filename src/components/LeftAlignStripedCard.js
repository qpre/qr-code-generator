import React from 'react';

export const LeftAlignStripedCardContainer = ({
  title,
  subtitle,
  renderActions,
  children,
  className = '',
  bodyClassName = '',
  style = {}
}) => (
  <div className={`bg-white shadow overflow-hidden sm:rounded-lg ${className}`}>
    {(title || subtitle || renderActions) && (
      <div className="px-4 py-5 border-b border-gray-300 sm:px-6 lg:flex lg:items-center lg:justify-between">
        <div className="flex-1 min-w-0">
          {title && (
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {title}
            </h3>
          )}

          {subtitle && (
            <p className="mt-1 max-w-2xl text-sm leading-5 text-gray-500">
              {subtitle}
            </p>
          )}
        </div>

        {renderActions && (
          <div className="mt-5 flex lg:mt-0 lg:ml-4">
            <span className="hidden sm:block shadow-sm rounded-md">
              {renderActions()}
            </span>
          </div>
        )}
      </div>
    )}

    <div style={style}>
      <dl className={bodyClassName}>{children}</dl>
    </div>
  </div>
);

export const LeftAlignStripedCardItem = ({ title, children }) => (
  <div className="bg-white px-4 py-5 border-b border-gray-200 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
    <dt className="text-sm leading-5 font-medium text-gray-500">{title}</dt>
    <dd className="mt-1 text-sm leading-5 text-gray-900 sm:mt-0 sm:col-span-2">
      {children}
    </dd>
  </div>
);
