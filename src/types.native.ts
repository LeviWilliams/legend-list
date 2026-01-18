import type { ComponentProps } from "react";
import type {
    Animated,
    Insets,
    LayoutRectangle,
    NativeScrollEvent,
    NativeSyntheticEvent,
    ScrollResponderMixin,
    ScrollView,
    ScrollViewComponent,
    ScrollViewProps,
    StyleProp,
    View,
    ViewStyle,
} from "react-native";
import type Reanimated from "react-native-reanimated";

import type {
    InternalStateBase,
    LegendListPropsBaseInternal,
    LegendListRefBase,
    LegendListStateBase,
} from "./types.base";

type NativePlatformTypes = {
    ScrollViewProps: ScrollViewProps;
    ScrollViewRef: React.ElementRef<typeof ScrollViewComponent>;
    ScrollView: ScrollView;
    ScrollResponderMixin: ScrollResponderMixin;
    View: View;
    StyleProp: StyleProp<ViewStyle>;
    NativeSyntheticEvent: NativeSyntheticEvent<NativeScrollEvent>;
    Insets: Insets;
    LayoutRectangle: LayoutRectangle;
};

type NativeScrollViewProps =
    | ComponentProps<typeof ScrollView>
    | ComponentProps<typeof Animated.ScrollView>
    | ComponentProps<typeof Reanimated.ScrollView>;

export type LegendListPropsBase<
    ItemT,
    TScrollViewProps extends NativeScrollViewProps,
    TItemType extends string | undefined = string | undefined,
> = LegendListPropsBaseInternal<ItemT, TScrollViewProps, NativePlatformTypes, TItemType>;

export type LegendListProps<ItemT = any> = LegendListPropsBase<ItemT, ComponentProps<typeof ScrollView>>;

export type InternalState = InternalStateBase<NativePlatformTypes>;
export type LegendListState = LegendListStateBase<NativePlatformTypes>;
export type LegendListRef = LegendListRefBase<NativePlatformTypes>;

export {
    type ColumnWrapperStyle,
    type GetRenderedItem,
    type GetRenderedItemResult,
    type InitialScrollAnchor,
    type LegendListRecyclingState,
    type LegendListRenderItemProps,
    type LegendListMetrics,
    type MaintainScrollAtEndOptions,
    type MaintainVisibleContentPositionConfig,
    type MaintainVisibleContentPositionNormalized,
    type OnViewableItemsChanged,
    type ScrollIndexWithOffset,
    type ScrollIndexWithOffsetAndContentOffset,
    type ScrollIndexWithOffsetPosition,
    type ScrollTarget,
    type StickyHeaderConfig,
    type ThresholdSnapshot,
    type TypedForwardRef,
    type TypedMemo,
    type ViewabilityAmountCallback,
    type ViewabilityCallback,
    type ViewabilityConfig,
    type ViewabilityConfigCallbackPair,
    type ViewabilityConfigCallbackPairs,
    type ViewableRange,
    type ViewAmountToken,
    type ViewToken,
    typedForwardRef,
    typedMemo,
} from "./types.base";
