import type { Schema, Struct } from '@strapi/strapi';

export interface TourSpecExclusionItem extends Struct.ComponentSchema {
  collectionName: 'components_tour_spec_exclusion_items';
  info: {
    displayName: 'Exclusion Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface TourSpecHighlightItem extends Struct.ComponentSchema {
  collectionName: 'components_tour_spec_highlight_items';
  info: {
    displayName: 'Highlight Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface TourSpecInclusionItem extends Struct.ComponentSchema {
  collectionName: 'components_tour_spec_inclusion_items';
  info: {
    displayName: 'Inclusion Item';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface TourSpecItineraryDay extends Struct.ComponentSchema {
  collectionName: 'components_tour_spec_itinerary_days';
  info: {
    displayName: 'Itinerary Day';
  };
  attributes: {
    dayContent: Schema.Attribute.Blocks;
    dayLabel: Schema.Attribute.String;
    dayTitle: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'tour-spec.exclusion-item': TourSpecExclusionItem;
      'tour-spec.highlight-item': TourSpecHighlightItem;
      'tour-spec.inclusion-item': TourSpecInclusionItem;
      'tour-spec.itinerary-day': TourSpecItineraryDay;
    }
  }
}
