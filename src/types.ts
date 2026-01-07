import type { ComponentProps, CSSProperties, ReactElement } from "react";

import type { LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent } from "@/platform/platform-types";
import type {
    InternalStateBase,
    LegendListPropsBaseInternal,
    LegendListRefBase,
    LegendListStateBase,
} from "./types.base";

type DOMInsets = {
    top?: number;
    left?: number;
    bottom?: number;
    right?: number;
};

type DOMStyleProp =
    | CSSProperties
    | CSSProperties[]
    | Record<string, unknown>
    | Record<string, unknown>[]
    | object
    | string
    | number
    | false
    | null
    | undefined;

type DOMEventHandlers = Omit<React.DOMAttributes<HTMLDivElement>, "onScroll">;
type DOMEventHandlerOverrides = { [Key in keyof DOMEventHandlers]?: any };

type DOMScrollViewProps = Omit<ComponentProps<"div">, "onScroll" | "ref" | "style"> & DOMEventHandlerOverrides & {
    style?: DOMStyleProp;
    contentContainerStyle?: DOMStyleProp;
    contentInset?: DOMInsets;
    horizontal?: boolean | null;
    scrollEventThrottle?: number;
    showsHorizontalScrollIndicator?: boolean;
    showsVerticalScrollIndicator?: boolean;
    refreshControl?: ReactElement | null;
    refreshing?: boolean;
    onRefresh?: () => void;
    progressViewOffset?: number;
    onLayout?: (event: any) => void;
    onMomentumScrollEnd?: (event: any) => void;
    onScroll?: (event: any) => void;
    scrollIndicatorInsets?: DOMInsets;
};

type DOMNativeSyntheticEvent = NativeSyntheticEvent<NativeScrollEvent>;

type DOMPlatformTypes = {
    ScrollViewProps: DOMScrollViewProps;
    ScrollViewRef: any;
    ScrollView: any;
    ScrollResponderMixin: object;
    View: object;
    StyleProp: DOMStyleProp;
    NativeSyntheticEvent: DOMNativeSyntheticEvent;
    Insets: DOMInsets;
    LayoutRectangle: LayoutRectangle;
};

export type LegendListPropsBase<
    ItemT,
    TScrollViewProps,
    TItemType extends string | undefined = string | undefined,
> = LegendListPropsBaseInternal<ItemT, TScrollViewProps, DOMPlatformTypes, TItemType>;

export type LegendListProps<ItemT = any> = LegendListPropsBase<ItemT, DOMScrollViewProps>;

export type InternalState = InternalStateBase<DOMPlatformTypes>;
export type LegendListState = LegendListStateBase<DOMPlatformTypes>;
export type LegendListRef = LegendListRefBase<DOMPlatformTypes>;

export {
    type ColumnWrapperStyle,
    type GetRenderedItem,
    type GetRenderedItemResult,
    type InitialScrollAnchor,
    type LegendListRecyclingState,
    type LegendListRenderItemProps,
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
